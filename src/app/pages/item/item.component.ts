import { Component, OnInit, Input } from '@angular/core';
import { ItemService } from '../../../services/item-service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Item } from '../../model/Item';
import { Meta, Title } from '@angular/platform-browser';


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
    private meta: Meta,
    private title: Title,
  ) { 
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.getItem(Number(paramMap.get('id')));
    });
  }

  private getDescription() {
    let result = `${this.item.itemName.displayName}`;
    if (this.item.description) {
      result += `: ${this.item.description}`
    }

    result += " - Cirquel, The Crowdsourced Circus Library for Aerial Silks, Hoops, Trapeze, Pole and Acro Balance!"

    return result;
  }

  private getItem(id: number) {
    this.state = 'loading';
    this.itemService.getItem(id)
    .then((result) => {
      this.state = 'idle';
      this.item = result;
      this.setMeta();
    })
    .catch((e) => {
      this.state = 'error';
      console.error(e);
    });
  }

  private setMeta() {
    this.meta.updateTag({ 
      name: 'description', 
      content: this.getDescription()
    });

    this.meta.addTag({ 
      name: 'author', 
      content: this.item.author.userName
    });

    this.title.setTitle(`${this.item.itemName.displayName} - Cirquel - The Crowdsourced Circus Library!`);

  }

}
