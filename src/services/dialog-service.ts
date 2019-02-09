import { Injectable } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DownloadModalComponent } from '../app/modals/download-modal/download-modal.component';
import { MessageModalComponent } from '../app/modals/message-modal/message-modal.component';




@Injectable()
export class DialogService {

  constructor(
    private modalService: BsModalService
  ) {

  }

  public showDownloadModal() {
    this.modalService.show(DownloadModalComponent);
  }

  public showMessageModal() {
    this.modalService.show(MessageModalComponent);
  }



}


