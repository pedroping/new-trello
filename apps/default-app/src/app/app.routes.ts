import { Route } from '@angular/router';
import { HomePageComponent } from './domain/home-page/home-page.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: HomePageComponent,
    children: [],
  },
];
