import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BackDropEvent } from '../../models/backdrop-screen-models';

@Injectable({ providedIn: 'root' })
export class BackdropStateService {
  private showBackDrop$ = new BehaviorSubject<BackDropEvent | null>(null);
  private showBackDrop$$ = this.showBackDrop$.asObservable();

  get backDropSubscription$() {
    return this.showBackDrop$$;
  }

  setBackDropState(value: BackDropEvent | null = null) {
    this.showBackDrop$.next(value);
  }
}
