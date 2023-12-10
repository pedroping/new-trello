import { Injectable } from '@angular/core';
import { Subject, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OutsideClickEventsService {
  startTaking$ = new Subject<void>();
  stopTaking$ = new Subject<void>();
  outSideClick$ = new Subject<void>();
  editClick$ = new Subject<void>();

  editClick$$ = this.editClick$.asObservable();
  outSideClick$$ = this.outSideClick$
    .asObservable()
    .pipe(tap(() => this.stopTaking$.next()));

  constructor() {}
}
