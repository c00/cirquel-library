import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-message-modal',
  templateUrl: './message-modal.component.html',
  styleUrls: ['./message-modal.component.scss']
})
export class MessageModalComponent implements OnInit {
  validated = false;
  loading = false;
  error = false;
  success = false;

  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private modal: BsModalRef,
  ) { 
    //Setup the form
    this.form = this.formBuilder.group({
      name:        ['', [Validators.required, Validators.maxLength(100)] ],
      email:       ['', [Validators.required, Validators.email] ],
      message: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  public dismiss() {
    this.modal.hide();
  }

  public async send() {
    this.error = false;
    this.validated = true;
    console.log(this.form.value);
    if (this.form.invalid) return;

    this.loading = true;
    try {
      await this.api.post('site-support', this.form.value);
      this.success = true;
    } catch (err) {
      this.error = true;
    }
    
    this.loading = false;
  }

}
