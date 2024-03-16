import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  DisableButtonOnDragDirective
} from '@my-monorepo/core/features/trello-tools';
import { GenericSidenavsFacadeService } from '@my-monorepo/core/ui/generic-sidenavs';

@Component({
  selector: 'uf-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.scss'],
  standalone: true,

  imports: [MatIconModule, MatButtonModule, DisableButtonOnDragDirective],
})
export class RightSidebarComponent {
  constructor(
    private readonly genericSidenavsFacadeService: GenericSidenavsFacadeService,
  ) {}

  closeSidebar() {
    this.genericSidenavsFacadeService.setRightSideNavState(false);
  }
}
