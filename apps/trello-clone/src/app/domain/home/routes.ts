import { Routes } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { HomePageComponent } from './home-page/home-page.component';

export default [
  {
    path: '',
    component: WelcomePageComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomePageComponent,
      },
    ],
  },
] as Routes;
