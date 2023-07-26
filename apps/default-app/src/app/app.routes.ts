import { Route } from '@angular/router';
import { HomePageComponent } from './domain/home-page/home-page.component';

export const appRoutes: Route[] = [
  {
    path: 'home',
    component: HomePageComponent,
    children: [],
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];
