import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: async () =>
      (await import('./trello-page/trello-page.component'))
        .TrelloPageComponent,
  },
] as Routes;
