import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BackDropEvent } from '../models/backdrop-screen-models';

@Injectable({ providedIn: 'root' })
export class BackdropStateService {
  private backDropEvent$ = new BehaviorSubject<
    BackDropEvent | null | undefined
  >(null);
  private backDropEvent$$ = this.backDropEvent$.asObservable();

  get backDropEventSubscription$() {
    return this.backDropEvent$$;
  }

  setBackDropState(contentDirective?: BackDropEvent | null) {
    this.backDropEvent$.next(contentDirective);
  }
}
