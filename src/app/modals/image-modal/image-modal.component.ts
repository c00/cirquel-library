import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.scss']
})
export class ImageModalComponent implements AfterViewInit{
  loading = true;
  images: { name: string, text: string }[] = [];
  selectedIndex: number;
  @ViewChild('img') img: ElementRef;
    
  constructor(private modal: BsModalRef) { 

  }

  ngAfterViewInit() {
    this.img.nativeElement.onload = () => {
      this.loading = false;
    }
  }

  public getImage(image: string, size?: string) {
    if (!size) size = 'lg';
    return `https://images.cirquelapp.com/static/${image}_${size}.jpg`;
  }

  public next() {
    this.loading = true;
    this.selectedIndex++;
    if (this.selectedIndex >= this.images.length) this.selectedIndex = 0;
  }

  public prev() {
    this.loading = true;
    if (this.selectedIndex <= 0) this.selectedIndex = this.images.length;
    this.selectedIndex--;
  } 

  public dismiss() {
    this.modal.hide();
  }

}
