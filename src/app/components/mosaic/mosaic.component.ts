import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ItemService } from 'src/services/item-service';

import { MosaicItem } from '../../model/ApiResult';

@Component({
  selector: 'app-mosaic',
  templateUrl: './mosaic.component.html',
  styleUrls: ['./mosaic.component.scss']
})
export class MosaicComponent implements OnInit, AfterViewInit {
  @ViewChild('container') container: ElementRef;

  squareSize: number = 50;
  itemsToLoad = 32;
  wantedSize = 150;
  showLines = 2;

  squares: MosaicItem[] = [];

  constructor(private itemService: ItemService) {
    this.load();
  }

  private async load() {
    this.squares = await this.itemService.getMosaic(this.itemsToLoad);
  }

  public ngOnInit() {
  }

  public ngAfterViewInit() {
    console.log("ngAfterViewChecked");
    this.calcSquareSize();
  }

  public onResize() {
    //todo debounce
    this.calcSquareSize();
  }

  private calcSquareSize() {
    console.log("Recalc");
    const containerWidth = this.container.nativeElement.getBoundingClientRect().width;
    const imagesPerRow = Math.floor(containerWidth / this.wantedSize);
    this.squareSize = Math.floor(containerWidth / imagesPerRow);
  }

}
