import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CoreFeaturesSelectedRouteModule } from '@my-monorepo/core/features/selected-route';
import { ToolbarService } from '@my-monorepo/core/ui/toolbar';
import { appRoutes } from '../../../app.routes';
@Component({
  selector: 'app-sideNav',
  templateUrl: './sideNav.component.html',
  styleUrls: ['./sideNav.component.scss'],
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    CommonModule,
    RouterModule,
    CoreFeaturesSelectedRouteModule,
  ],
})
export class SideNavComponent implements OnInit {
  constructor(private readonly toolbarService: ToolbarService) { }

  appRoutes = appRoutes.filter(item => item.path);

  ngOnInit() { }

  emitEvent() {
    this.toolbarService.menuEvent$.next(false);
  }
}
