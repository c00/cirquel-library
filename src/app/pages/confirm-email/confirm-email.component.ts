import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss']
})
export class ConfirmEmailComponent {

  loading = true;
  token: string;

  constructor(
    private api: ApiService,
    route: ActivatedRoute,
  ) { 
    route.queryParams.subscribe((params) => {
      this.token = params.token || null;
      this.confirm();
    });
  }

  private async confirm() {
    if (!this.token) {
      this.loading = false;
      return;
    }

    try {
      await this.api.get('confirm-email/' + this.token);
    } catch (e){
      console.log(e);
      this.loading = false;
    }
    this.loading = false;    
  }


  
}
