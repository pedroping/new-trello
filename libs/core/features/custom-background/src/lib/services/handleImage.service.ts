import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ISrcImg } from '../models/custom-background-models';

@Injectable({
  providedIn: 'root',
})
export class HandleImageService {
  imgSrc$ = new BehaviorSubject<ISrcImg[]>([]);
  selectedImage$ = new BehaviorSubject<ISrcImg | null>(null);

  uploadImage(event: Event) {
    const typedTaget = event.target as HTMLInputElement;

    if (typedTaget.files && typedTaget.files[0]) {
      const img = typedTaget.files[0];

      if (!img.type.includes('image')) {
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = () => {
        if (reader.result) {
          const newImg = { id: this.imgSrc$.value.length, src: reader.result };
          this.imgSrc$.next([...this.imgSrc$.value, newImg]);
          this.selectedImage$.next(newImg);
        }
      };
    }
  }

  selectImage(image: ISrcImg) {
    this.selectedImage$.next(image);
  }
}
