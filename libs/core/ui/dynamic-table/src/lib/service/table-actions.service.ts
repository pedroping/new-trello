import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TableActions {
  private resetTable$ = new Subject<void>();

  resetTable() {
    this.resetTable$.next();
  }

  get resetTable$$() {
    return this.resetTable$.asObservable();
  }
}
