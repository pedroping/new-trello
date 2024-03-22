import { Type } from '@angular/core';
import { ConfigPageComponent } from '../components/config-page/config-page.component';
import { RightSidebarActionsComponent } from '../components/right-sidebar-actions/right-sidebar-actions.component';
import { ChangeWallpaperPageComponent } from '../components/change-wallpaper-page/change-wallpaper-page.component';

export interface IPageChange {
  component: Type<unknown>;
  pageName: string;
}

export enum ALL_PAGES {
  actions,
  cofigPage,
  changeWallpaper,
}

export const PAGE_COMPONENTS: IPageChange[] = [
  {
    pageName: 'Menu',
    component: RightSidebarActionsComponent,
  },
  {
    pageName: 'Configurações',
    component: ConfigPageComponent,
  },
  {
    pageName: 'Alterar Wallpaper',
    component: ChangeWallpaperPageComponent,
  },
];
