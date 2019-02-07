import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { ItemService } from '../../../services/item-service';
import { MetaService } from '../../../services/meta-service';
import { Item } from '../../model/Item';


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {
  item: Item;
  state = 'loading';

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService,
    private meta: MetaService
  ) { 
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.getItem(Number(paramMap.get('id')));
    });
  }

  private getItem(id: number) {
    this.state = 'loading';
    this.itemService.getItem(id)
    .then((result) => {
      this.state = 'idle';
      this.item = result;
      this.meta.setItemInfo(result);
    })
    .catch((e) => {
      this.state = 'error';
      console.error(e);
    });
  }

  

}
