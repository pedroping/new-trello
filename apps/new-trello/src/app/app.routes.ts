import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: async () => (await import('./domain/routes')).HOME_ROUTES,
  },
];
