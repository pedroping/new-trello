import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, fromEvent, merge, startWith } from 'rxjs';

@UntilDestroy()
@Injectable({ providedIn: 'root' })
export class OnlineOfflineStateService {
  isOnline$$ = new BehaviorSubject<boolean>(true);

  constructor() {
    this.setStatesChanges();
  }

  private setStatesChanges() {
    const initialState = window.navigator.onLine;
    merge(fromEvent(window, 'online'), fromEvent(window, 'offline'))
      .pipe(startWith([initialState, initialState]), untilDestroyed(this))
      .subscribe(() => {
        this.isOnline$$.next(!!window.navigator.onLine);
      });
  }

  get state() {
    return this.isOnline$$.value;
  }

  get stateChanges$() {
    return this.isOnline$$
      .asObservable()
      .pipe(startWith(this.isOnline$$.value), untilDestroyed(this));
  }
}
