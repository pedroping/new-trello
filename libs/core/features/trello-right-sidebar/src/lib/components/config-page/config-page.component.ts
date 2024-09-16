import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DarkModeToggleDirective } from '@my-monorepo/core/features/dark-mode';
import { DbFacadeService } from '@my-monorepo/core/features/trello-db';
import { RightSidebarFacade } from '../../facade/right-sidebar-facade.service';
import { ALL_PAGES } from '../../models/all-pages';
import { SidebarActionComponent } from '../sidebar-action/sidebar-action.component';
@Component({
  selector: 'trello-config-page',
  templateUrl: './config-page.component.html',
  styleUrls: ['./config-page.component.scss'],
  standalone: true,
  imports: [
    MatSlideToggleModule,
    DarkModeToggleDirective,
    MatIconModule,
    SidebarActionComponent,
  ],
})
export class ConfigPageComponent {
  allPages = ALL_PAGES;
  constructor(
    private readonly dbFacadeService: DbFacadeService,
    private readonly rightSidebarFacade: RightSidebarFacade,
  ) {}

  changePage(page: number) {
    this.rightSidebarFacade.setPage(page);
  }

  importContent() {
    this.dbFacadeService.importContent();
  }
  exportContent() {
    this.dbFacadeService.exportContent();
  }
}
