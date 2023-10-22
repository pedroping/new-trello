import { Injectable, inject } from '@angular/core';
import { ScrollEventsService } from '@my-monorepo/core/facades';
import { BehaviorSubject } from 'rxjs';

export interface IBlock {
  name: string;
  cards: number[];
  addNewEvent$: BehaviorSubject<boolean>;
}

export const BLOCKS = Array.from({ length: 5 }, (_, i) => {
  return {
    name: `To Do ${i}`,
    cards: Array.from({ length: 5 }, (_, i) => i + 1),
    addNewEvent$: new BehaviorSubject<boolean>(false),
  };
});

@Injectable({
  providedIn: 'root',
})
export class CardMocksService {
  private readonly scrollEventsService = inject(ScrollEventsService);
  blocks$ = new BehaviorSubject<IBlock[]>([]);

  addNew(listName: string) {
    const blocks = [
      ...this.blocks$.value,
      {
        name: listName,
        cards: Array.from({ length: 5 }, (_, i) => i + 1),
        addNewEvent$: new BehaviorSubject<boolean>(false),
      },
    ];
    this.blocks$.next(blocks);
    this.scrollEventsService.scrollToEnd$.next();
  }

  getAllCards() {
    this.blocks$.next(BLOCKS);
  }

  clearMocks() {
    this.blocks$.next([]);
  }
}
