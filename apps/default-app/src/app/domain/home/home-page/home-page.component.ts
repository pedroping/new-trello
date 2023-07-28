import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import {
  CoreFeaturesDarkModeModule,
  DarkModeService,
} from '@my-monorepo/core/features/dark-mode';
import { CoreUiSidenavModule } from '@my-monorepo/core/ui/sidenav';
import { CoreUiToolbarModule } from '@my-monorepo/core/ui/toolbar';
import { SideNavComponent } from '../../../core/components/sideNav/sideNav.component';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  standalone: true,
  imports: [
    CoreUiToolbarModule,
    MatIconModule,
    CoreUiSidenavModule,
    MatButtonModule,
    RouterModule,
    CoreFeaturesDarkModeModule,
    SideNavComponent,
  ],
})
export class HomePageComponent implements OnInit {
  constructor(
    private readonly darkModeService: DarkModeService
  ) {}

  ngOnInit() {}

  toggleDarkMode() {
    this.darkModeService.toggleDarkMode();
  }
}
