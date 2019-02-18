import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ApiService } from '../../../services/api';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent {
  success = false;
  token: string;
  password1: string = '';
  password2: string = '';
  loading = false;
  passwordTooWeak = false;
  passwordsMismatch = false;
  tokenUsed = false;
  unknownError = false;

  constructor(
    route: ActivatedRoute,
    private api: ApiService,
  ) { 
    route.queryParams.subscribe((params) => {
      this.token = params.token || null;
    });
  }

  public async submit() {
    this.passwordTooWeak = false;
    this.passwordsMismatch = false;
    this.tokenUsed = false;
    this.unknownError = false;

    //Checking
    if (this.password1 !== this.password2) {
      this.passwordsMismatch = true;
      return;
    }
    if (this.password1.length < 6) {
      this.passwordTooWeak = true;
      return;
    }

    this.loading = true;
    try {
      await this.api.put('password', { token: this.token, password: this.password1 });
      this.loading = false;
      this.success = true;
    } catch (err) {
      if (err.status === 412) {
        this.tokenUsed = true;
      } else if (err.status === 400) {
        this.passwordTooWeak = true;
      } else {
        this.unknownError = true;
      }
      console.log(err);
      this.loading = false;
    }
    

  }

}
