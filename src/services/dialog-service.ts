import { Injectable } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DownloadModalComponent } from '../app/modals/download-modal/download-modal.component';




@Injectable()
export class DialogService {

  constructor(
    private modalService: BsModalService
  ) {

  }

  public showDownloadModal() {
    let modal: BsModalRef;
    const initialState = {
      
    };
    modal = this.modalService.show(DownloadModalComponent, { initialState });
    
    console.log(modal);

  }



}


