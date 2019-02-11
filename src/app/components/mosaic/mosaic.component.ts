import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ContentChildren, ViewChildren, QueryList } from '@angular/core';
import { ItemService } from 'src/services/item-service';

import { MosaicItem } from '../../model/ApiResult';

@Component({
  selector: 'app-mosaic',
  templateUrl: './mosaic.component.html',
  styleUrls: ['./mosaic.component.scss']
})
export class MosaicComponent {
  @ViewChild('container') container: ElementRef;
  @ViewChildren('squares') squareElements: QueryList<ElementRef>;

  itemsToLoad = 32;
  squares: MosaicItem[] = [];

  showLines: number;
  squareSize: number;

  get containerHeight() {
    if (!this.showLines || !this.squareSize) return null;
    return this.showLines * this.squareSize;
  }

  constructor(private itemService: ItemService) {
    this.load();
  }

  private async load() {
    this.squares = await this.itemService.getMosaic(this.itemsToLoad);
    setTimeout(() => { this.calcGrid(); } );
  }

  private timeout;
  public onResize() {
    //Reset it
    if (this.timeout) clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      this.calcGrid();
    }, 100);
  }

  private calcGrid() {
    //Return if some stuff isn't initialized yet.
    if (!this.squareElements.first || !this.container || !this.squares) return;

    const containerWidth = this.container.nativeElement.getBoundingClientRect().width;
    const squareWidth = this.squareElements.first.nativeElement.getBoundingClientRect().width;
    const imagesPerRow = Math.round(containerWidth / squareWidth);

    const bottomRowSquares = this.squares.length % imagesPerRow;
    const rows = Math.ceil(this.squares.length / imagesPerRow);

    this.squareSize = squareWidth;
    if (bottomRowSquares === 0) {
      this.showLines = null;
    } else {
      this.showLines = rows - 1;
    }
  }

}
