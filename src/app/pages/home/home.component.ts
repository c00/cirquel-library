import { Component, OnInit } from '@angular/core';

import { ItemService } from '../../../services/item-service';
import { Item } from '../../model/Item';
import { DialogService } from '../../../services/dialog-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  state = 'idle';
  items: Item[];

  constructor(private itemService: ItemService, private dialogs: DialogService) {
    this.getItems();
  }

  ngOnInit() {
    
  }

  public openDownloadModal() {
    this.dialogs.showDownloadModal();
  }

  public send() {
    this.dialogs.showMessageModal();
  }

  private getItems() {
    this.state = 'loading';
    this.itemService.getItems(0, 9)
    .then((result) => {
      this.state = 'idle';
      this.items = result;
    })
    .catch((e) => {
      this.state = 'error';
      console.error(e);
    });
  }

}
