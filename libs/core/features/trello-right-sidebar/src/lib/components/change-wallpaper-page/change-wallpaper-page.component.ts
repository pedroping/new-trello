import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HandleImageService } from '@my-monorepo/core/features/custom-background';
import { GenericSidenavsFacadeService } from '@my-monorepo/core/ui/generic-sidenavs';
import { SidebarActionComponent } from '../sidebar-action/sidebar-action.component';
import { WallpaperImageComponent } from '../wallpaper-image/wallpaper-image.component';

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

  constructor(
    private readonly handleImageService: HandleImageService,
    private readonly genericSidenavsFacadeService: GenericSidenavsFacadeService,
  ) {}

  addImage(event: Event) {
    this.handleImageService.uploadImage(event);
  }

  removeImage() {
    this.handleImageService.unselectImage();
    this.genericSidenavsFacadeService.setRightSideNavState(false);
  }
}
