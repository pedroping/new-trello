import { Directive, HostBinding } from '@angular/core';
import { HandleImageService } from '../services/handleImage.service';
import { filter, map } from 'rxjs';

@Directive({
  selector: '[customBackground]',
})
export class CustomBackgroundDirective {
  @HostBinding('style.background-image') image!: string;

  constructor(private readonly handleImageService: HandleImageService) {
    this.handleImageService.selectedImage$
      .pipe(
        filter((img) => !!img),
        map((img) => `url(${img})`)
      )
      .subscribe((image) => {
        this.image = image;
      });
  }
}
