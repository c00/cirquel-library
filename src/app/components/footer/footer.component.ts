import { Component, OnInit } from '@angular/core';
import { DialogService } from '../../../services/dialog-service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private dialogs: DialogService) { }

  ngOnInit() {
  }

  public send() {
    this.dialogs.showMessageModal();
  }

}
