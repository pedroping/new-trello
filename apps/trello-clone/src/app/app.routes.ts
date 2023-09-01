import { Route } from '@angular/router';
import { HomePageComponent } from './domain/home/home-page/home-page.component';

export const appRoutes: Route[] = [
    {
        path: 'home',
        component: HomePageComponent,
        pathMatch: 'full'
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    }
];
