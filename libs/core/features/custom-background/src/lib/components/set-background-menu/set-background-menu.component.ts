import { AsyncPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ISrcImg } from '@my-monorepo/core/utlis';
import { HandleImageService } from '../../services/handleImage.service';

@Component({
  selector: 'set-background-menu',
  templateUrl: './set-background-menu.component.html',
  styleUrls: ['./set-background-menu.component.scss'],
  standalone: true,
  imports: [MatIconModule, AsyncPipe],
})
export class SetBackgroundMenuComponent {
  cdkMenuTrigger = input.required<
    unknown & {
      close: () => void;
    }
  >();

  images$ = this.handleImageService.imgSrc$;

  constructor(readonly handleImageService: HandleImageService) {}

  uploadImage(event: Event) {
    this.handleImageService.uploadImage(event);
  }

  selectImg(image: ISrcImg) {
    this.handleImageService.selectImage(image);
    this.cdkMenuTrigger().close();
  }
}
