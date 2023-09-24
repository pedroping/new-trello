import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export const BLOCKS = Array.from({ length: 5 }, (_, i) => {
  return {
    name: `To Do ${i}`,
    cards: Array.from({ length: 5 }, (_, i) => i + 1),
  };
});

@Injectable({
  providedIn: 'root',
})
export class CardMocksService {
  blocks$ = new BehaviorSubject(BLOCKS);

  constructor() {}

  addNew() {
    const index = this.blocks$.value.length + 1;
    const blocks = [
      ...this.blocks$.value,
      {
        name: `To Do ${index}`,
        cards: Array.from({ length: 5 }, (_, i) => i + 1),
      },
    ];
    this.blocks$.next(blocks);
  }
}
