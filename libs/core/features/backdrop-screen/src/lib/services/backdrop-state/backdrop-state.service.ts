import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BackdropStateService {
  private showBackDrop$ = new BehaviorSubject<boolean>(false);
  private showBackDrop$$ = this.showBackDrop$.asObservable();

  domRect!: DOMRect;

  get backDropSubscription$() {
    return this.showBackDrop$$;
  }

  setBackDropState(value: boolean) {
    this.showBackDrop$.next(value);
  }
}
