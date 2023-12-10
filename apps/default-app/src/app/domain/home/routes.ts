import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: async () =>
      (await import('../home/pages/home-page/home-page.component'))
        .HomePageComponent,

    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadComponent: async () =>
          (await import('../home/pages/welcome-page/welcome-page.component'))
            .WelcomePageComponent,
      },
      {
        path: 'dynamic-table',
        loadComponent: async () =>
          (
            await import(
              '../dynamic-table/pages/dynamic-table/dynamic-table.component'
            )
          ).DynamicTableComponent,
      },
      {
        path: 'online-offline-state',
        loadComponent: async () =>
          (
            await import(
              '../online-offline-state/online-offline-state/online-offline-state.component'
            )
          ).OnlineOfflineStateComponent,
      },
    ],
  },
] as Routes;
