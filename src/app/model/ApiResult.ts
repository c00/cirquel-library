import { Author } from './Author';
import { Item } from './Item';

export interface UserItemsResult {
  author: Author;
  items: Item[];
  pages: number;
  criteria: any;
}