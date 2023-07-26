import { Route } from '@angular/router';
import { HomePageComponent } from './domain/home/home-page/home-page.component';
import { WelcomePageComponent } from './domain/home/welcome-page/welcome-page.component';

export const appRoutes: Route[] = [
  {
    path: 'home',
    component: HomePageComponent,
    children: [
      {
        path: '',
        component: WelcomePageComponent,
      },
    ],
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
