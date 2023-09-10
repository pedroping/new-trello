import { Component, Input, OnInit } from '@angular/core';
import { HandleImageService } from '../../services/handleImage.service';

@Component({
  selector: 'set-background-menu',
  templateUrl: './set-background-menu.component.html',
  styleUrls: ['./set-background-menu.component.scss'],
})
export class SetBackgroundMenuComponent implements OnInit {
  @Input({ required: true }) cdkMenuTrigger!: unknown & {
    close: () => void;
  };

  images$ = this.handleImageService.imgSrc$;

  constructor(readonly handleImageService: HandleImageService) {}

  ngOnInit() {}

  uploadImage(event: Event) {
    this.handleImageService.uploadImage(event);
  }

  selectImg(image: string | ArrayBuffer) {
    this.handleImageService.selectImage(image);
    this.cdkMenuTrigger.close();
  }
}
