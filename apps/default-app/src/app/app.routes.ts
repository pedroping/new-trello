import { Route } from '@angular/router';
import { HomePageComponent } from './domain/home/pages/home-page/home-page.component';
import { IrouteContext } from '@my-monorepo/core/features/selected-route';
import { WelcomePageComponent } from './domain/home/pages/welcome-page/welcome-page.component';
import { DynamicTableComponent } from './domain/dynamic-table/pages/dynamic-table/dynamic-table.component';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () => import('./domain/home/routes'),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

export const displayedRoutes: IrouteContext[] = [
  {
    title: 'Home',
    children: [
      {
        title: 'Página Incial',
        path: './home',
      },
    ],
  },
  {
    title: 'Dynamic Table',
    children: [
      {
        title: 'Dynamic Table',
        path: './dynamic-table',
      },
    ],
  },
];
