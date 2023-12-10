import { Injectable } from '@angular/core';
import { ScrollEventsService } from '@my-monorepo/core/utlis';
import { BehaviorSubject, of } from 'rxjs';
import { IBlock } from '../../models/card.models';

export const BLOCKS = Array.from({ length: 5 }, (_, i) => {
  return {
    name: `To Do ${i}`,
    cards: Array.from({ length: 5 }, (_, i) => ({
      id: i,
      name: `Card ${i}`,
    })),
    addNewEvent$: new BehaviorSubject<boolean>(false),
  };
});

@Injectable({
  providedIn: 'root',
})
export class CardMocksService {
  blocks$ = new BehaviorSubject<IBlock[]>([]);

  constructor(private readonly scrollEventsService: ScrollEventsService) {}

  addNew(listName: string) {
    const blocks = [
      ...this.blocks$.value,
      {
        name: listName,
        cards: [],
        addNewEvent$: new BehaviorSubject<boolean>(false),
      },
    ];
    this.blocks$.next(blocks);
    this.scrollEventsService.scrollToEnd$.next();
  }

  getAllCards(hasMocks = false) {
    return of(BLOCKS).subscribe((blocks) => {
      this.blocks$.next(hasMocks ? blocks : []);
    });
  }

  clearMocks() {
    this.blocks$.next([]);
  }
}
