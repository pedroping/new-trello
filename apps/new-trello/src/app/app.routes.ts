import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: async () =>
      (await import('./domain/home/routes')).HOME_ROUTES,
  },
];
