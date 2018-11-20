import { EventEmitter, Injectable } from '@angular/core';
import { ApiService } from './api';
import { Item } from '../app/model/Item';
import { UserItemsResult } from '../app/model/ApiResult';

@Injectable()
export class ItemService {
  
  public itemAdded = new EventEmitter<Item>();
  public searchComplete = new EventEmitter<Item[]>();

  constructor(
    private api: ApiService,
  ) {
    
  }

  public getItems(page: number, limit?: number){
    if (!limit) limit = 10;

    const url = UrlBuilder.new('items')
    .addParam('page', String(page))
    .addParam('limit', String(limit))
    .toString();

    return this.api.get(url)
    .then(result => {
      this.searchComplete.emit(result);
      return result;
    });
  }

  public getUserItems(stub: string): Promise<UserItemsResult> {
    return this.api.get(`user-profile/${stub}`);
  }

  public getItem(id: number){
    return this.api.get(`item/${id}`)
    .then(result => {
      this.searchComplete.emit(result);
      return result;
    });
  }
}

export class UrlBuilder {
  params: { key: string, value: string }[] = [];

  constructor(private base: string) {}

  static new(base: string): UrlBuilder {
    const u = new UrlBuilder(base);

    return u;
  }

  public addParams(object: any) {
    for (let key in object) {
      if (!object.hasOwnProperty(key)) continue;

      this.addParam(key, object[key]);
    }

    return this;
  }

  public addParam(key: string, value: string): UrlBuilder {
    if (value === null || value === undefined || value === '') return this;

    key = key.trim();
    value = String(value).trim();
    
    this.params.push({key, value});
    return this;
  }

  public toString(): string {
    let string = this.base;

    if (this.params.length === 0) return string;

    let pairs = [];
    for (let p of this.params) {
      pairs.push( encodeURIComponent(p.key) + '=' + encodeURIComponent(p.value));
    }

    string += '?' + pairs.join('&');

    return string;
  }
}