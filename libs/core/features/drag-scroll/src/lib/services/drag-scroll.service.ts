import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DragScrollService {
  scrollToEnd$ = new Subject<void>();

  constructor() {}
}
