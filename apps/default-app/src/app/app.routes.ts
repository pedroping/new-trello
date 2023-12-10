import { Route } from '@angular/router';
import { IrouteContext } from '@my-monorepo/core/features/selected-route';

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
  {
    title: 'Online e Offline State',
    children: [
      {
        title: 'Online e Offline State',
        path: './online-offline-state',
      },
    ],
  },
];
