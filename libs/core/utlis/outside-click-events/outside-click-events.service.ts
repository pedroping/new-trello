import { Injectable } from '@angular/core';
import { Subject, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OutsideClickEventsService {
  startTaking$ = new Subject<void>();
  stopTaking$ = new Subject<void>();
  outSideClick$ = new Subject<void>();

  outSideClick$$ = this.outSideClick$
    .asObservable()
    .pipe(tap(() => this.stopTaking$.next()));

  constructor() {}
}
