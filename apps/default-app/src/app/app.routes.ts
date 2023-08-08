import { Route } from '@angular/router';
import { HomePageComponent } from './domain/home/home-page/home-page.component';
import { WelcomePageComponent } from './domain/home/welcome-page/welcome-page.component';
import { IrouteContext } from '@my-monorepo/core/features/selected-route'

export const appRoutes: Route[] = [
  {
    path: '',
    component: HomePageComponent,
    children: [
      {
        path: 'home',
        component: WelcomePageComponent,
        pathMatch: 'full'
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ],
  },
  {
    path: '**',
    redirectTo: ''
  }
];

export const displayedRoutes: IrouteContext[] = [
  {
    title: 'Home',
    children: [
      {
        title: 'Página Incial',
        path: './home'
      }
    ]
  },
]
