import { Directive } from '@angular/core';
import { CallSetValueChanges } from '@my-monorepo/core/features/set-value-changes-decorator';
import { map } from 'rxjs';
import { HandleImageService } from '../services/handleImage.service';

@Directive({
  selector: '[customBackground]',
  standalone: true,
  host: {
    class: 'custom-background',
  },
})
@CallSetValueChanges()
export class CustomBackgroundDirective {
  style!: HTMLStyleElement;

  constructor(private readonly handleImageService: HandleImageService) {}

  setValueChanges() {
    this.createStyleTag();
    this.handleImageService.selectedImage$
      .pipe(map((img) => (img ? `url(${img.src})` : '')))
      .subscribe((image) => {
        this.setBackgroud(image);
      });
  }

  createStyleTag() {
    this.style = document.createElement('style');
    document.body.appendChild(this.style);
  }

  setBackgroud(imgStyle: string) {
    const firstChild = this.style.firstChild;
    if (firstChild) this.style.removeChild(firstChild);
    const newStyle = `.custom-background { background-image: ${imgStyle} }`;
    this.style.appendChild(document.createTextNode(newStyle));
  }
}
