import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CardMocksService } from '../card-mocks/card-mocks.service';

@Injectable({ providedIn: 'root' })
export class DragAndDropService {

  cards = new Array(5);
  onMove$ = new BehaviorSubject<boolean>(false);
  onCardMove$ = new BehaviorSubject<boolean>(false);
  onBlockMove = false
  lastToBeHovered = -1

  readonly cardMocksService = inject(CardMocksService)

  drop(event: CdkDragDrop<number[]>) {
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

  blockDrop(
    event: CdkDragDrop<
      {
        name: string;
        cards: number[];
      }[]
    >
  ) {
    moveItemInArray(
      this.cardMocksService.blocks$.value,
      event.previousIndex,
      event.currentIndex
    );
  }

  onMove(cdr: ChangeDetectorRef) {
    this.onBlockMove = true;
    if (this.onMove$.value) return;
    this.onMove$.next(true);
    cdr.detectChanges();
  }

  onDrop(cdr: ChangeDetectorRef) {
    this.onBlockMove = false;
    if (!this.onMove$.value) return;
    this.onMove$.next(false);
    cdr.detectChanges();
  }
}
