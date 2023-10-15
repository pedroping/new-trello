import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { DynamicTableComponent } from '../dynamic-table/pages/dynamic-table/dynamic-table.component';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';

export default [
  {
    path: '',
    component: HomePageComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: WelcomePageComponent,
      },
      {
        path: 'dynamic-table',
        component: DynamicTableComponent,
      }
    ],
  },
] as Routes;
