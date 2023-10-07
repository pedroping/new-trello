import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ScrollEventsService {

  scrollToEnd$ = new Subject<void>()
  
  constructor() { }

}
