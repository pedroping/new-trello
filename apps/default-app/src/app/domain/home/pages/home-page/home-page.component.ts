import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { SidenavComponent } from '@my-monorepo/core/ui/sidenav';
import { ToolbarComponent } from '@my-monorepo/core/ui/toolbar';
import { SideNavComponent } from '../../../../core/components/sideNav/sideNav.component';
import { ToolBarComponent } from '../../../../core/components/toolBar/toolBar.component';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  standalone: true,
  imports: [
    ToolbarComponent,
    MatIconModule,
    SidenavComponent,
    MatButtonModule,
    RouterModule,
    SideNavComponent,
    ToolBarComponent,
  ],
})
export class HomePageComponent {
  constructor() {}
}
