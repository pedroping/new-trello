import { Injectable } from '@angular/core';
import { Subject, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OutsideClickEventsService {
  private startTaking$ = new Subject<void>();
  private stopTaking$ = new Subject<void>();
  private outSideClick$ = new Subject<void>();
  private editClick$ = new Subject<void>();

  constructor() {}

  setStartTaking() {
    this.startTaking$.next();
  }

  setStopTaking() {
    this.stopTaking$.next();
  }

  setOutSideClick() {
    this.outSideClick$.next();
  }

  setEditClick() {
    this.editClick$.next();
  }

  get editClick$$() {
    return this.editClick$.asObservable();
  }

  get outSideClick$$() {
    return this.outSideClick$
      .asObservable()
      .pipe(tap(() => this.stopTaking$.next()));
  }

  get startTaking$$() {
    return this.startTaking$.asObservable();
  }

  get stopTaking$$() {
    return this.stopTaking$.asObservable();
  }
}
