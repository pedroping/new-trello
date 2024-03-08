import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Injectable } from '@angular/core';
import {
  IBlock,
  Icard,
  OutsideClickEventsService,
  ScrollEventsService,
} from '@my-monorepo/core/utlis';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import {
  BehaviorSubject,
  filter,
  merge,
  takeUntil,
  tap,
  throttleTime,
} from 'rxjs';
import { LIST_ID_ATTR } from '../../models/card.models';
import { DbFacadeService } from '@my-monorepo/core/features/trello-db';

@Injectable({ providedIn: 'root' })
@UntilDestroy()
export class DragAndDropService {
  onMove$ = new BehaviorSubject<boolean>(false);
  onCardMove$ = new BehaviorSubject<boolean>(false);
  onBlockMove = false;
  cardMoving?: Icard;
  lastToBeHovered = -1;

  constructor(
    private readonly dbFacadeService: DbFacadeService,
    private readonly scrollEventsService: ScrollEventsService,
    private readonly outsideClickEventsService: OutsideClickEventsService,
  ) {}

  startDomain() {
    this.setValueChanges();
  }

  setValueChanges(): void {
    merge(this.onCardMove$, this.onMove$)
      .pipe(
        filter((move) => !!move),
        untilDestroyed(this),
        takeUntil(this.outsideClickEventsService.stopTaking$),
      )
      .subscribe(() => this.outsideClickEventsService.outSideClick$.next());

    this.onCardMove$
      .pipe(
        tap((value) => {
          if (value) this.scrollEventsService.onMouseDown$.next(true);
        }),
        throttleTime(1000),
      )
      .subscribe((value) => {
        if (!value) this.scrollEventsService.onMouseDown$.next(false);
      });
  }

  drop(event: CdkDragDrop<Icard[]>) {
    const oldListId =
      event.previousContainer.element.nativeElement.getAttribute(LIST_ID_ATTR);
    const newListId =
      event.container.element.nativeElement.getAttribute(LIST_ID_ATTR);

    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      this.cardMoving = undefined;
      if (!oldListId || !newListId) return;
      this.validCardsOrder(+oldListId, +newListId);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      if (newListId && this.cardMoving) {
        const editCard: Icard = { ...this.cardMoving, blockId: +newListId };
        this.cardMoving.blockId = +newListId;
        this.dbFacadeService.editCard(editCard).subscribe(() => {
          if (!oldListId || !newListId) return;
          this.validCardsOrder(+oldListId, +newListId);
        });
        this.cardMoving = undefined;
      }
    }
  }

  blockDrop(event: CdkDragDrop<IBlock[]>) {
    moveItemInArray(
      this.dbFacadeService.allBlocks$.value,
      event.previousIndex,
      event.currentIndex,
    );
  }

  onEvent(value: boolean) {
    this.onBlockMove = value;
    this.onMove$.next(value);
  }

  moveToBlock(blockToRemove: Icard[], blockToAdd: Icard[], card: Icard) {
    const index = blockToRemove.findIndex(
      (blockCard) => blockCard.id === card.id,
    );
    blockToRemove.splice(index, 1);
    blockToAdd.push(card);
  }

  validCardsOrder(oldListId: number, newListId: number) {
    const allBlocks = this.dbFacadeService.allBlocks$.value;
    if (oldListId === newListId) {
      const cards =
        allBlocks.find((block) => block.id === newListId)?.cards$.value ?? [];

      cards.forEach((card, index) => {
        const newCard: Icard = { ...card, cardIndex: index };
        this.dbFacadeService.editCard(newCard);
      });
      return;
    }

    const oldListCards =
      allBlocks.find((block) => block.id === oldListId)?.cards$.value ?? [];
    const newListCards =
      allBlocks.find((block) => block.id === newListId)?.cards$.value ?? [];

    [...oldListCards, ...newListCards].forEach((card, index) => {
      const newCard: Icard = { ...card, cardIndex: index };
      this.dbFacadeService.editCard(newCard);
    });
  }
}
