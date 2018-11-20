import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appBgImage]'
})
export class BgImageDirective implements OnChanges {
  @Input('appBgImage') image: string;

  constructor(private el: ElementRef) { }
  
  public ngOnChanges(changes) {
    this.el.nativeElement.style.backgroundImage = `url(${this.image})`;
  }

}
