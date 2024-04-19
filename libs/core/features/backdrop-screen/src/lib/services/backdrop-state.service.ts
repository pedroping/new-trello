import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BackDropEvent } from '../models/backdrop-screen-models';

@Injectable({ providedIn: 'root' })
export class BackdropStateService<T> {
  private backDropEvent$ = new BehaviorSubject<
    BackDropEvent<T> | null | undefined
  >(null);
  private backDropEvent$$ = this.backDropEvent$.asObservable();

  get backDropEventValue() {
    return this.backDropEvent$.value;
  }

  get backDropEventSubscription$() {
    return this.backDropEvent$$;
  }

  setBackDropState(objecConfig: BackDropEvent<T>) {
    this.backDropEvent$.next(objecConfig);
  }

  removeBackDrop() {
    this.backDropEvent$.next(null);
  }
}
