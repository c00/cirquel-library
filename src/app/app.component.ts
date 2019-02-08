import { Component, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DialogService } from 'src/services/dialog-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cirque-library';
  modalRef: BsModalRef;
  collapsed = true;
  
  constructor(private dialogs: DialogService) {

  }

  public openModal() {
    this.dialogs.showDownloadModal();
  }
}
