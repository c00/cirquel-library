import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../environments/environment';
import { EnvironmentBase } from '../environments/environment.base';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {
  settings: EnvironmentBase = environment;

  transform(value: string, size?: string, extension?: string) {
    if (!value) value = 'blank_avatar';
    if (!size) size = 'lg';
    if (!extension) extension = 'jpg';

    return `${this.settings.itemImgRoot}${value}_${size}.${extension}`;
  }

}
