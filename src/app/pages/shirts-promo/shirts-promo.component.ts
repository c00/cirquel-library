import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ImageModalComponent } from '../../modals/image-modal/image-modal.component';

@Component({
  selector: 'app-shirts-promo',
  templateUrl: './shirts-promo.component.html',
  styleUrls: ['./shirts-promo.component.scss']
})
export class ShirtsPromoComponent implements OnInit {

  images = [
    { name: 'both_front', text: 'Life is better with awesome shirts!'},
    { name: 'her_front edited', text: 'Upside down is the right side up!'},
    { name: 'his_back edited', text: 'Hanging out with some fresh threads.'},
    { name: 'her_back edited', text: 'If you can read this...'},
    { name: 'black_girl_back', text: 'Tank Top, Girl, Back'},
    { name: 'black_girl_front', text: 'Tank Top, Girl, Front'},
    { name: 'black_guy_back', text: 'Tank Top, Guy, Back'},
    { name: 'black_guy_front', text: 'Tank Top, Guy, Front'},
    { name: 'white_back', text: 'T-shirt, back (same for both designs)'},
    { name: 'white_girl_front', text: 'T-shirt, Girl, Front'},
    { name: 'white_guy_front', text: 'T-shirt, Guy, Front'},
  ];

  constructor(private modals: BsModalService) { }

  ngOnInit() {
  }

  public getImage(image: string, size?: string) {
    if (!size) size = 'sq';
    return `https://images.cirquelapp.com/static/${image}_${size}.jpg`;
  }

  public openModal(image: string) {
    const index = this.images.findIndex(i => i.name === image );
    this.modals.show(ImageModalComponent, { class: 'modal-lg', initialState: { images: this.images, selectedIndex: index }});
  }

}
