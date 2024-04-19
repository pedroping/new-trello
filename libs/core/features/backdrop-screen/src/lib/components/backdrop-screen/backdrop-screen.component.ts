import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  EnvironmentInjector,
  Type,
  ViewContainerRef,
  effect,
  inject,
  viewChild,
} from '@angular/core';
import { CallSetValueChanges } from '@my-monorepo/core/features/set-value-changes-decorator';
import { BackdropStateService } from '../../services/backdrop-state.service';
@Component({
  selector: 'backdrop-screen',
  templateUrl: './backdrop-screen.component.html',
  styleUrls: ['./backdrop-screen.component.scss'],
  standalone: true,
  imports: [NgTemplateOutlet, AsyncPipe],
})
@CallSetValueChanges()
export class BackdropScreenComponent<T> {
  injector = inject(EnvironmentInjector);
  viewContainerRef = viewChild('vcr', { read: ViewContainerRef });

  backdropEventSubscription$ =
    this.backdropStateService.backDropEventSubscription$;
  constructor(readonly backdropStateService: BackdropStateService<T>) {}

  setValueChanges() {
    effect(() => {
      const viewContainerRef = this.viewContainerRef();
      const backdropEvent = this.backdropStateService.backDropEventValue;
      if (!viewContainerRef || !backdropEvent) return;

      viewContainerRef.clear();
      const { instance } = viewContainerRef.createComponent<T>(
        backdropEvent.component as Type<T>,
        { injector: backdropEvent.injector },
      );

      if (backdropEvent.data && instance)
        Object.assign(instance, backdropEvent.data);
    });
  }
}
