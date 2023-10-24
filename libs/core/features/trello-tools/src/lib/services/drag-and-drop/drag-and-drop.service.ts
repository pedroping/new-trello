import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Injectable, inject } from '@angular/core';
import {
  OutsideClickEventsService,
  ScrollEventsService,
} from '@my-monorepo/core/utlis';
import {
  BehaviorSubject,
  filter,
  merge,
  takeUntil,
  tap,
  throttleTime,
} from 'rxjs';
import { CardMocksService } from '../card-mocks/card-mocks.service';
import { IBlock, Icard } from '../../models/card.models';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';

@Injectable({ providedIn: 'root' })
@UntilDestroy()
export class DragAndDropService {
  cards = new Array(5);
  onMove$ = new BehaviorSubject<boolean>(false);
  onCardMove$ = new BehaviorSubject<boolean>(false);
  onBlockMove = false;
  lastToBeHovered = -1;

  private readonly cardMocksService = inject(CardMocksService);
  private readonly scrollEventsService = inject(ScrollEventsService);
  private readonly outsideClickEventsService = inject(
    OutsideClickEventsService
  );

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

  onMove(cdr: ChangeDetectorRef) {
    this.onBlockMove = true;
    this.onMove$.next(true);
    cdr.detectChanges();
  }

  onDrop(cdr: ChangeDetectorRef) {
    this.onBlockMove = false;
    this.onMove$.next(false);
    cdr.detectChanges();
  }
}
