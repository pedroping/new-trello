import { Directive, HostBinding } from '@angular/core';
import { CallSetValueChanges } from '@my-monorepo/core/features/set-value-changes-decorator';
import { map } from 'rxjs';
import { HandleImageService } from '../services/handleImage.service';

@Directive({
  selector: '[customBackground]',
  standalone: true,
})
@CallSetValueChanges()
export class CustomBackgroundDirective {
  @HostBinding('style.background-image') image!: string;

  constructor(private readonly handleImageService: HandleImageService) {}

  setValueChanges() {
    this.handleImageService.selectedImage$
      .pipe(map((img) => (img ? `url(${img.src})` : '')))
      .subscribe((image) => {
        this.image = image;
      });
  }
}
