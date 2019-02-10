import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked, Input } from '@angular/core';
import { ItemService } from 'src/services/item-service';
import { MosaicItem } from '../../model/ApiResult';
import { container } from '@angular/core/src/render3';

@Component({
  selector: 'app-mosaic',
  templateUrl: './mosaic.component.html',
  styleUrls: ['./mosaic.component.scss']
})
export class MosaicComponent implements OnInit, AfterViewChecked {
  @ViewChild('container') container: ElementRef;

  squareSize: number = 50;
  @Input() cols = 6;
  @Input() rows = 3;

  squares: MosaicItem[] = [];

  constructor(private itemService: ItemService) {
    this.load();
  }

  private async load() {
    this.squares = await this.itemService.getMosaic(this.cols * this.rows);
  }

  public ngOnInit() {
  }

  public ngAfterViewChecked() {
    this.calcSquareSize();
  }

  public onResize() {
    this.calcSquareSize();
  }

  private calcSquareSize() {
    this.squareSize = this.container.nativeElement.getBoundingClientRect().width / this.cols;
  }

}
