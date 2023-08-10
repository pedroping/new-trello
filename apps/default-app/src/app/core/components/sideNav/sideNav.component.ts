import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CoreFeaturesSelectedRouteModule } from '@my-monorepo/core/features/selected-route';
import { ToolbarService } from '@my-monorepo/core/ui/toolbar';
import { displayedRoutes } from '../../../app.routes';
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
    MatExpansionModule
  ],
})
export class SideNavComponent implements OnInit {
  constructor(private readonly toolbarService: ToolbarService) { }

  displayedRoutes = displayedRoutes

  ngOnInit() { }

  emitEvent() {
    this.toolbarService.menuEvent$.next(false);
  }
}
