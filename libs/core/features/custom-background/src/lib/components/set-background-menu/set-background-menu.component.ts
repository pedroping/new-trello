import { Component, Input } from '@angular/core';
import { HandleImageService } from '../../services/handleImage.service';
import { MatIconModule } from '@angular/material/icon';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'set-background-menu',
  templateUrl: './set-background-menu.component.html',
  styleUrls: ['./set-background-menu.component.scss'],
  standalone: true,
  imports: [MatIconModule, AsyncPipe],
})
export class SetBackgroundMenuComponent {
  @Input({ required: true }) cdkMenuTrigger!: unknown & {
    close: () => void;
  };

  images$ = this.handleImageService.imgSrc$;

  constructor(readonly handleImageService: HandleImageService) {}

  uploadImage(event: Event) {
    this.handleImageService.uploadImage(event);
  }

  selectImg(image: string | ArrayBuffer) {
    this.handleImageService.selectImage(image);
    this.cdkMenuTrigger.close();
  }
}
