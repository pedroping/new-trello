import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HandleImageService {
  imgSrc$ = new BehaviorSubject<(string | ArrayBuffer)[]>([]);
  selectedImage$ = new BehaviorSubject<string | ArrayBuffer | null>(null);

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
          this.imgSrc$.next([...this.imgSrc$.value, reader.result]);
          this.selectedImage$.next(reader.result)
        }
      };
    }
  }

  selectImage(image: string | ArrayBuffer) {
    this.selectedImage$.next(image);
  }
}
