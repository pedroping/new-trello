import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CoreUiToolbarModule } from '@my-monorepo/core/ui/toolbar';
import { CoreUiSidenavModule } from '@my-monorepo/core/ui/sidenav';
import { ToolbarService } from '@my-monorepo/core/ui/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import {
  CoreFeaturesDarkModeModule,
  DarkModeService,
} from '@my-monorepo/core/features/dark-mode';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  standalone: true,
  imports: [
    CoreUiToolbarModule,
    MatIconModule,
    CoreUiSidenavModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    CoreFeaturesDarkModeModule,
  ],
})
export class HomePageComponent implements OnInit {
  constructor(
    private readonly toolbarService: ToolbarService,
    private readonly darkModeService: DarkModeService
  ) {}

  ngOnInit() {}

  emitEvent() {
    this.toolbarService.menuEvent$.next(false);
  }

  toggleDarkMode() {
    this.darkModeService.toggleDarkMode();
  }
}
