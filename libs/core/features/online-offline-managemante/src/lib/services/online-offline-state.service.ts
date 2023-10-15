import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, fromEvent, startWith } from 'rxjs';

@UntilDestroy()
@Injectable({ providedIn: 'root' })
export class OnlineOfflineStateService {
  isOnline$$ = new BehaviorSubject<boolean>(true);

  constructor() {
    this.setStatesChanges();
  }

  private setStatesChanges() {
    [fromEvent(window, 'online'), fromEvent(window, 'offline')].forEach(
      (subscription) => {
        subscription
          .pipe(startWith(window.navigator.onLine), untilDestroyed(this))
          .subscribe(() => {
            this.isOnline$$.next(!!window.navigator.onLine);
          });
      }
    );
  }

  get state() {
    return this.isOnline$$.value;
  }

  get stateChanges$() {
    return this.isOnline$$
      .asObservable()
      .pipe(startWith(this.isOnline$$.value));
  }
}
