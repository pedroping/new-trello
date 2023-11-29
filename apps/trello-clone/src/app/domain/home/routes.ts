import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: async () =>
      (await import('../home/welcome-page/welcome-page.component'))
        .WelcomePageComponent,

    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadComponent: async () =>
          (await import('../home/home-page/home-page.component'))
            .HomePageComponent,
      },
    ],
  },
] as Routes;
