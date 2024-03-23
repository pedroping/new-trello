import { CdkMenuModule } from '@angular/cdk/menu';
import { Component, HostListener, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {
  HandleImageService,
  ISrcImg,
} from '@my-monorepo/core/features/custom-background';
import { WallpaperImageMenuComponent } from '../wallpaper-image-menu/wallpaper-image-menu.component';

@Component({
  selector: 'trello-wallpaper-image',
  templateUrl: './wallpaper-image.component.html',
  styleUrls: ['./wallpaper-image.component.scss'],
  standalone: true,
  imports: [MatIconModule, CdkMenuModule, WallpaperImageMenuComponent],
})
export class WallpaperImageComponent {
  imgItem = input.required<ISrcImg>();

  constructor(private readonly handleImageService: HandleImageService) {}

  @HostListener('click') selectImg() {
    this.handleImageService.selectImage(this.imgItem());
  }
}
