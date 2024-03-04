import { provideHttpClient } from '@angular/common/http';
import {
  APP_INITIALIZER,
  ApplicationConfig,
  FactoryProvider,
  importProvidersFrom,
  inject,
  isDevMode,
} from '@angular/core';
import { Meta } from '@angular/platform-browser';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
import {
  provideRouter,
  withComponentInputBinding,
  withEnabledBlockingInitialNavigation,
  withViewTransitions,
} from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';
import {
  CardEventsFacadeService,
  IndexedDbService,
} from '@my-monorepo/core/features/trello-tools';
import { TuiRootModule } from '@taiga-ui/core';
import { environment } from '../environments/environment';
import { appRoutes } from './app.routes';
import { META_TAGS } from './shared/meta.tags';
import {
  META_DARK_COLOR,
  META_LIGHT_COLOR,
} from '@my-monorepo/core/features/dark-mode';

const loadMocksProviders: FactoryProvider = {
  provide: APP_INITIALIZER,
  useFactory: () => {
    const cardEventsFacadeService = inject(CardEventsFacadeService);
    return () => cardEventsFacadeService.getAllCards(!environment.production);
  },
  multi: true,
};

const setMetaProviders: FactoryProvider = {
  provide: APP_INITIALIZER,
  useFactory: () => {
    const meta = inject(Meta);
    return () => meta.addTags(META_TAGS);
  },
  multi: true,
};

const indexedDBProviders: FactoryProvider = {
  provide: APP_INITIALIZER,
  useFactory: () => {
    const indexedService = inject(IndexedDbService);
    return () => indexedService.createDataBase();
  },
  multi: true,
};

const colorsProviders: FactoryProvider[] = [
  {
    provide: META_DARK_COLOR,
    useFactory: () => '#82888A',
  },
  {
    provide: META_LIGHT_COLOR,
    useFactory: () => '#FFFFFF',
  },
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      appRoutes,
      withEnabledBlockingInitialNavigation(),
      withComponentInputBinding(),
      withViewTransitions(),
    ),
    provideHttpClient(),
    provideAnimations(),
    importProvidersFrom(TuiRootModule, BrowserAnimationsModule),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
    indexedDBProviders,
    loadMocksProviders,
    setMetaProviders,
    ...colorsProviders,
  ],
};
