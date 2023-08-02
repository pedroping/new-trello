import { Route } from '@angular/router';
import { HomePageComponent } from './domain/home/home-page/home-page.component';
import { WelcomePageComponent } from './domain/home/welcome-page/welcome-page.component';
import { AutoGenerateComponent } from './domain/autoGenerate/autoGenerate.component';
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
        path: 'generate',
        component: AutoGenerateComponent,
        pathMatch: 'full',
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ],
  },
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
  {
    title: 'Generate',
    children: [
      {
        title: 'Directive Generate',
        path: './generate'
      }
    ]
  }
]
