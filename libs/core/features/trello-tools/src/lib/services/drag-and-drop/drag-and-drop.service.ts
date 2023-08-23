import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DragAndDropService {
  cards = new Array(5);

  constructor() {}
}
