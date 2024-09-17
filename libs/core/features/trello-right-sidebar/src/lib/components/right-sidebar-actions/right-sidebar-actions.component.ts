import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DbFacadeService } from '@my-monorepo/core/features/trello-db';
import { GenericSidenavsFacadeService } from '@my-monorepo/core/ui/generic-sidenavs';
import { RightSidebarFacade } from '../../facade/right-sidebar-facade.service';
import { ALL_PAGES } from '../../models/all-pages';
import { SidebarActionComponent } from '../sidebar-action/sidebar-action.component';

@Component({
  selector: 'trello-right-sidebar-actions',
  templateUrl: './right-sidebar-actions.component.html',
  styleUrls: ['./right-sidebar-actions.component.scss'],
  standalone: true,
  imports: [SidebarActionComponent, MatIconModule],
})
export class RightSidebarActionsComponent {
  allPages = ALL_PAGES;

  constructor(
    private readonly dbFacadeService: DbFacadeService,
    private readonly rightSidebarFacade: RightSidebarFacade,
    private readonly genericSidenavsFacadeService: GenericSidenavsFacadeService,
  ) {}

  changePage(page: number) {
    this.rightSidebarFacade.setPage(page);
  }

  clearBoard() {
    const clearBoard = confirm(
      'Você realmente deseja limpar todo o seu quadro ?',
    );

    if (!clearBoard) return;
    
    this.dbFacadeService.clearDb();
    this.genericSidenavsFacadeService.setRightSideNavState(false);
  }
}
