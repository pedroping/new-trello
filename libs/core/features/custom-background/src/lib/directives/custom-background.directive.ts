import { Directive, HostBinding } from '@angular/core';
import { HandleImageService } from '../services/handleImage.service';
import { filter, map } from 'rxjs';
import { CallSetValueChanges } from '@my-monorepo/core/features/set-value-changes-decorator';

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
      .pipe(
        filter((img) => !!img),
        map((img) => `url(${img!.src})`),
      )
      .subscribe((image) => {
        this.image = image;
      });
  }
}
