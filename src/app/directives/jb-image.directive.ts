import { Directive, Input } from '@angular/core';

//This directive is courtesy of Jordan Benge https://github.com/Bengejd
@Directive({
  selector: '[jbSrc]',
  host: {
    '[attr.src]': 'finalImage'    //the attribute of the host element we want to update. in this case, <img 'src' />
  }
})
export class JbImageDirective {
  @Input('jbSrc') targetSource: string;
  // Set an input so the directive can set a default image.
  @Input() defaultImage: string = 'assets/img/blank_avatar_md.jpg';
  downloadingImage: HTMLImageElement; // In class holder of remote image
  finalImage: string; //property bound to our host attribute.

  constructor() { }

  //ngOnInit is needed to access the @inputs() variables. these aren't available on constructor()
  public ngOnInit() {
    //First set the final image to some default image while we prepare our preloader:
    this.finalImage = this.defaultImage;

    this.downloadingImage = new Image();  // create image object
    this.downloadingImage.onload = () => { //Once image is completed, console.log confirmation and switch our host attribute
      this.finalImage = this.targetSource;  //do the switch 😀
    }
    // Assign the src to that of some_remote_image_url. Since its an Image Object the
    // on assignment from this.targetSource download would start immediately in the background
    // and trigger the onload()
    this.downloadingImage.src = this.targetSource;
  }

}
