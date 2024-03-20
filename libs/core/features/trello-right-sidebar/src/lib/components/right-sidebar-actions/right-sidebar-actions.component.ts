import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SidebarActionComponent } from '../sidebar-action/sidebar-action.component';
import { RightSidebarFacade } from '../../facade/right-sidebar-facade.service';
import { ALL_PAGES } from '../../models/all-pages';

@Component({
  selector: 'trello-right-sidebar-actions',
  templateUrl: './right-sidebar-actions.component.html',
  styleUrls: ['./right-sidebar-actions.component.scss'],
  standalone: true,
  imports: [SidebarActionComponent, MatIconModule],
})
export class RightSidebarActionsComponent {
  allPages = ALL_PAGES;

  constructor(private readonly rightSidebarFacade: RightSidebarFacade) {}

  changePage(page: number) {
    this.rightSidebarFacade.setPage(page);
  }

  clearBoard() {}
}
