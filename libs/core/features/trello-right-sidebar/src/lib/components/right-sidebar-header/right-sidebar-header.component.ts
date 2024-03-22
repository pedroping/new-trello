import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DisableButtonOnDragDirective } from '@my-monorepo/core/features/trello-tools';
import { GenericSidenavsFacadeService } from '@my-monorepo/core/ui/generic-sidenavs';
import { map } from 'rxjs';
import { RightSidebarFacade } from '../../facade/right-sidebar-facade.service';
import { ALL_PAGES, PAGE_COMPONENTS } from '../../models/all-pages';

@Component({
  selector: 'trello-right-sidebar-header',
  templateUrl: './right-sidebar-header.component.html',
  styleUrls: ['./right-sidebar-header.component.scss'],
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    DisableButtonOnDragDirective,
    AsyncPipe,
  ],
})
export class RightSidebarHeaderComponent {
  pageChange$ = this.rightSidebarFacade.pageChange$;
  backMenuOpacity$ = this.pageChange$.pipe(
    map((val) => (!!val ? { opacity: 1 } : { opacity: 0 })),
  );
  pageName$ = this.pageChange$.pipe(
    map((val) => (!!val || val === 0 ? PAGE_COMPONENTS[val].pageName : '')),
  );

  constructor(
    private readonly rightSidebarFacade: RightSidebarFacade,
    private readonly genericSidenavsFacadeService: GenericSidenavsFacadeService,
  ) {}

  closeSidebar() {
    this.genericSidenavsFacadeService.setRightSideNavState(false);
  }

  backPage() {
    this.rightSidebarFacade.setPage(this.rightSidebarFacade.lastPageOpened);
  }
}
