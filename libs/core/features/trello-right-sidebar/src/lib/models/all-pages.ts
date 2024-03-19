import { Type } from '@angular/core';
import { ConfigPageComponent } from '../components/config-page/config-page.component';
import { RightSidebarActionsComponent } from '../components/right-sidebar-actions/right-sidebar-actions.component';

export enum ALL_PAGES {
  actions,
  cofigPage,
}

export const PAGE_COMPONENTS: Type<unknown>[] = [
  RightSidebarActionsComponent,
  ConfigPageComponent,
];
