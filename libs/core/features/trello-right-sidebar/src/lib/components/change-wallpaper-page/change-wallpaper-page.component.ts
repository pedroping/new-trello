import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SidebarActionComponent } from '../sidebar-action/sidebar-action.component';
import { HandleImageService } from '@my-monorepo/core/features/custom-background';
import { AsyncPipe } from '@angular/common';
import { WallpaperImageComponent } from '../wallpaper-image/wallpaper-image.component';
import { ISrcImg } from 'libs/core/features/custom-background/src/lib/models/custom-background-models';

@Component({
  selector: 'change-wallpaper-page',
  templateUrl: './change-wallpaper-page.component.html',
  styleUrls: ['./change-wallpaper-page.component.scss'],
  standalone: true,
  imports: [
    MatIconModule,
    SidebarActionComponent,
    AsyncPipe,
    WallpaperImageComponent,
  ],
})
export class ChangeWallpaperPageComponent {
  imgSrc$$ = this.handleImageService.imgSrc$.asObservable();

  constructor(private readonly handleImageService: HandleImageService) {}

  addImage(event: Event) {
    this.handleImageService.uploadImage(event);
  }

  selectImage(image: ISrcImg) {
    this.handleImageService.selectImage(image);
  }
}
