import { Component, OnInit, Input } from '@angular/core';
import { ItemService } from 'src/services/item-service';
import { Item } from '../../model/Item';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit {
  @Input() item: Item;
  @Input() showCta = true;

  constructor(
  ) { }

  public ngOnInit() {
    
  }

}
