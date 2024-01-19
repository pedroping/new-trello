import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Injectable } from '@angular/core';
import {
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
import { IBlock, Icard } from '../../models/card.models';
import { CardMocksService } from '../card-mocks/card-mocks.service';

@Injectable({ providedIn: 'root' })
@UntilDestroy()
export class DragAndDropService {
  onMove$ = new BehaviorSubject<boolean>(false);
  onCardMove$ = new BehaviorSubject<boolean>(false);
  onBlockMove = false;
  lastToBeHovered = -1;

  constructor(
    private readonly cardMocksService: CardMocksService,
    private readonly scrollEventsService: ScrollEventsService,
    private readonly outsideClickEventsService: OutsideClickEventsService
  ) {}

  startDomain() {
    this.setValueChanges();
  }

  setValueChanges(): void {
    merge(this.onCardMove$, this.onMove$)
      .pipe(
        filter((move) => !!move),
        untilDestroyed(this),
        takeUntil(this.outsideClickEventsService.stopTaking$)
      )
      .subscribe(() => this.outsideClickEventsService.outSideClick$.next());

    this.onCardMove$
      .pipe(
        tap((value) => {
          if (value) this.scrollEventsService.onMouseDown$.next(true);
        }),
        throttleTime(1000)
      )
      .subscribe((value) => {
        if (!value) this.scrollEventsService.onMouseDown$.next(false);
      });
  }

  drop(event: CdkDragDrop<Icard[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  blockDrop(event: CdkDragDrop<IBlock[]>) {
    moveItemInArray(
      this.cardMocksService.blocks$.value,
      event.previousIndex,
      event.currentIndex
    );
  }

  onEvent(value: boolean) {
    this.onBlockMove = value;
    this.onMove$.next(value);
  }

  moveToBlock(blockToRemove: Icard[], blockToAdd: Icard[], card: Icard) {
    const index = blockToRemove.findIndex(
      (blockCard) => blockCard.id === card.id
    );
    blockToRemove.splice(index, 1);
    blockToAdd.push(card);
  }
}
