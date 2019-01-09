import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { ItemService } from '../../../services/item-service';
import { Author } from '../../model/Author';
import { Item } from '../../model/Item';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  state = 'idle';
  items: Item[] = [];
  author: Author;

  constructor(
    private itemService: ItemService, 
    private route: ActivatedRoute,
    private meta: Meta,
    private title: Title,
  ) {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.getUserProfile(paramMap.get('stub'));
    });    
  }

  ngOnInit() {
  }

  private getUserProfile(name: string) {
    this.state = 'loading';
    this.itemService.getUserItems(name)
      .then((result) => {
        if (!result.author.userName) {
          this.state = 'error';
          return;
        }

        this.state = 'idle';
        this.items = result.items;
        this.author = result.author;
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
      content: `${this.author.userName} on Cirquel.`
    });

    this.meta.addTag({
      name: 'author',
      content: this.author.userName
    });

    this.title.setTitle(`${this.author.userName} - Cirquel`);

  }

}
