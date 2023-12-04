import {
  APP_INITIALIZER,
  ApplicationConfig,
  FactoryProvider,
  importProvidersFrom,
  inject,
  isDevMode,
} from '@angular/core';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
import {
  provideRouter,
  withComponentInputBinding,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';
import { TuiRootModule } from '@taiga-ui/core';
import { appRoutes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { CardMocksService } from '@my-monorepo/core/features/trello-tools';
import { Meta } from '@angular/platform-browser';
import { META_TAGS } from './shared/meta.tags';

const loadMocksProviders: FactoryProvider = {
  provide: APP_INITIALIZER,
  useFactory: () => {
    const cardMocksService = inject(CardMocksService);
    return () => cardMocksService.getAllCards();
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

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      appRoutes,
      withEnabledBlockingInitialNavigation(),
      withComponentInputBinding()
    ),
    provideHttpClient(),
    provideAnimations(),
    importProvidersFrom(TuiRootModule, BrowserAnimationsModule),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
    loadMocksProviders,
    setMetaProviders,
  ],
};
