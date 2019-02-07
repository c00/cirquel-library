import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Item } from '../app/model/Item'
import { MetaInfo } from '../app/model/MetaInfo';
import { ImagePipe } from '../app/image.pipe';
import { Author } from '../app/model/Author';


@Injectable()
export class MetaService {
  imagePipe: ImagePipe;

  constructor(
    private meta: Meta,
    private title: Title,
  ) {
    this.imagePipe = new ImagePipe();
  }

  public setItemInfo(item: Item) {

    let current: MetaInfo = { 
      title: `${item.itemName.displayName} - Cirquel`, 
      description: this.getDescription(item), 
      imageUrl: this.imagePipe.transform(item.resource.imgBase),
      created: item.created,
      modified: item.created,
      author: item.author.userName,
    };

    this.setInfo(current);
  }

  public setUserInfo(author: Author, items?: Item[]) {
    if (!items) items = [];

    const sortedItems = items.sort((a: Item, b: Item) => {
      return a.created - b.created;
    });

    const lowest = sortedItems[0] || null;
    const highest = sortedItems[sortedItems.length - 1] || null;

    let current: MetaInfo = {
      title: `${author.userName} on Cirquel`, 
      description: `The profile of ${author.userName} on Cirquel! The crowdsourced Circus Library`, 
      imageUrl: this.imagePipe.transform(author.imgBase),
      created: lowest.created,
      modified: highest.created,
      author: author.userName,
    };

    this.setInfo(current);
  }

  private getDescription(item: Item) {
    let result: string;
    if (item.description) {
      result = item.description;
    } else {
      result = "Cirquel is a crowdsourced Circus Library for all your favorite Circus Arts.";
    }    

    return result;
  }

  private getIsoString(ms: number) {
    return (new Date(ms).toISOString());
  }

  private setInfo(info: MetaInfo) {

    /* Standard HTML tags */
    this.title.setTitle(info.title);
    this.meta.updateTag({ name: 'description', content: info.description });
    this.meta.addTag({ name: 'author', content: info.author });

    /* Google tags */
    this.meta.addTag({ itemprop: "name", content: info.title });
    this.meta.addTag({ itemprop: "description", content: info.description });
    this.meta.addTag({ itemprop: "image", content: info.imageUrl });

    /* twitter tags */
    this.meta.addTag({ name: "twitter:title", content: info.title });
    this.meta.addTag({ name: "twitter:description", content: info.description });
    this.meta.addTag({ name: "twitter:image:src", content: info.imageUrl });

    /* Opengraph (FB) */
    this.meta.addTag({ name: "og:title", content: info.title });
    this.meta.addTag({ name: "og:description", content: info.description });
    this.meta.addTag({ name: "og:image", content: info.imageUrl });

    if (info.created) this.meta.addTag({ name: "article:published_time", content: this.getIsoString(info.created) });
    if (info.modified) this.meta.addTag({ name: "article:modified_time", content: this.getIsoString(info.modified) });
  }
  
}


