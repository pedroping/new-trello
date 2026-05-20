import { createCustomElement } from '@angular/elements';
import { createApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

(async () => {
  const app = await createApplication(appConfig);

  const NewTrello = createCustomElement(AppComponent, {
    injector: app.injector,
  });
  customElements.define('new-trello', NewTrello);
})();
