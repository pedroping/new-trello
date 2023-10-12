import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ScrollEventsService } from '@my-monorepo/core/facades';

export const BLOCKS = Array.from({ length: 2 }, (_, i) => {
  return {
    name: `To Do ${i}`,
    cards: Array.from({ length: 5 }, (_, i) => i + 1),
  };
});

@Injectable({
  providedIn: 'root',
})
export class CardMocksService {
  private readonly scrollEventsService = inject(ScrollEventsService);
  blocks$ = new BehaviorSubject<
    {
      name: string;
      cards: number[];
    }[]
  >([]);

  addNew(listName: string) {
    const index = this.blocks$.value.length + 1;
    const blocks = [
      ...this.blocks$.value,
      {
        name: listName,
        cards: Array.from({ length: 5 }, (_, i) => i + 1),
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
