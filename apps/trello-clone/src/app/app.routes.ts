import { Route } from '@angular/router';
import { WelcomePageComponent } from './domain/welcome-page/welcome-page.component';
import { HomePageComponent } from './domain/home-page/home-page.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: WelcomePageComponent,
    pathMatch: 'full',
    children: [
      {
        path: '',
        component: HomePageComponent,
      },
    ],
  },
];
