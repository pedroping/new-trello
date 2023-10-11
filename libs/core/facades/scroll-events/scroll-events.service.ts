import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ScrollEventsService {
  onMouseDown$ = new BehaviorSubject<boolean>(false);
  scrollToEnd$ = new Subject<void>();

  constructor() {}
}
