import { CdkMenuTrigger } from '@angular/cdk/menu';
import { AsyncPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HandleImageService } from '@my-monorepo/core/features/custom-background';
import { DarkModeService } from '@my-monorepo/core/features/dark-mode';
import { CloseMenuDirective } from '@my-monorepo/core/features/trello-tools';
import { ISrcImg } from '@my-monorepo/core/utlis';
import { map } from 'rxjs';

@Component({
  selector: 'trello-wallpaper-image-menu',
  templateUrl: './wallpaper-image-menu.component.html',
  styleUrls: ['./wallpaper-image-menu.component.scss'],
  standalone: true,
  imports: [MatIconModule, MatButtonModule, CloseMenuDirective, AsyncPipe],
})
export class WallpaperImageMenuComponent {
  cdkTrigger = input.required<CdkMenuTrigger>();
  imgItem = input.required<ISrcImg>();

  darkIcon$ = this.darkModeService.darkMode$.asObservable();
  lightIcon$ = this.darkModeService.darkMode$
    .asObservable()
    .pipe(map((val) => !val));

  constructor(
    private readonly handleImageService: HandleImageService,
    private readonly darkModeService: DarkModeService,
  ) {}

  removePicture() {
    this.handleImageService.removeImage(this.imgItem());
    this.closeMenu();
  }

  closeMenu() {
    this.cdkTrigger().close();
  }

  setLightMode() {
    this.darkModeService.setLightMode();
  }

  setDarkMode() {
    this.darkModeService.setDarkMode();
  }
}
