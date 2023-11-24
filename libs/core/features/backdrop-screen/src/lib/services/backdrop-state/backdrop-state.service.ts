import { Injectable, TemplateRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BackdropStateService {
  private showBackDrop$ = new BehaviorSubject<
    TemplateRef<unknown> | undefined | null
  >(null);
  private showBackDrop$$ = this.showBackDrop$.asObservable();

  domRect!: DOMRect;

  get backDropSubscription$() {
    return this.showBackDrop$$;
  }

  setBackDropState(value: TemplateRef<unknown>) {
    this.showBackDrop$.next(value);
  }
}
