import { Injectable } from '@angular/core';
import { DbFacadeService } from '@my-monorepo/core/features/trello-db';
import { ISrcImg } from '@my-monorepo/core/utlis';
import { BehaviorSubject, take } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class HandleImageService {
  imgSrc$ = this.dbFacadeService.allWallpapers$;
  selectedImage$ = new BehaviorSubject<ISrcImg | null>(null);

  constructor(private readonly dbFacadeService: DbFacadeService) {}

  setValueChanges() {
    this.imgSrc$.pipe(take(2)).subscribe((imgs) => {
      imgs.forEach((img) => {
        if (img.selected) this.selectedImage$.next(img);
      });
    });
  }

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
          this.dbFacadeService
            .createWallpaper({ src: reader.result, selected: true })
            .subscribe((resp) => {
              const newImg = {
                id: resp.id,
                src: reader.result ?? '',
                selected: true,
              };
              this.imgSrc$.value.forEach((img) => {
                this.dbFacadeService.editWallPaper({ ...img, selected: false });
              });
              this.imgSrc$.next([...this.imgSrc$.value, newImg]);
              this.selectedImage$.next(newImg);
              typedTaget.value = '';
            });
        }
      };
    }
  }

  selectImage(image: ISrcImg | null) {
    this.selectedImage$.next(image);
    const unSelectAll = this.imgSrc$.value.map((imgSrc) => ({
      ...imgSrc,
      selected: image?.id === imgSrc.id,
    }));
    this.imgSrc$.next(unSelectAll);
    unSelectAll.forEach((image) => {
      this.dbFacadeService.editWallPaper(image);
    });
  }

  removeImage(image: ISrcImg) {
    const newImages = this.imgSrc$.value.filter((img) => img.id != image.id);
    this.dbFacadeService.deleteWallpaper(image.id).subscribe(() => {
      this.imgSrc$.next(newImages);
      if (image.selected) this.selectImage(null);
    });
  }
}
