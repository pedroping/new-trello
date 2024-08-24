import {
  CdkDragDrop,
  CdkDragMove,
  CdkDropList,
  DragDropModule,
} from '@angular/cdk/drag-drop';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, effect, viewChild } from '@angular/core';
import { CallSetValueChanges } from '@my-monorepo/core/features/set-value-changes-decorator';
import { IBlock, Icard } from '@my-monorepo/core/utlis';
import { BehaviorSubject, fromEvent, map, Observable, startWith } from 'rxjs';
import { ScrollToEndDirective } from '../../directives/scroll-to-end/scroll-to-end.directive';
import { CardEventsFacadeService } from '../../facades/card-events-facade.service';
import {
  DRAG_DELAY_BREAKPOINT,
  SCROLL_MOVE_TICK,
  TIME_TO_DRAG_START,
} from '../../models/card.models';
import { BlockDataService } from '../../services/block-data/block-data.service';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
  standalone: true,
  imports: [
    DragDropModule,
    ScrollToEndDirective,
    CardComponent,
    AsyncPipe,
    CdkScrollable,
    JsonPipe,
  ],
})
@CallSetValueChanges()
export class CardListComponent {
  id: number;
  blockCard: IBlock;
  isSelected = true;
  scrollMoveTick = SCROLL_MOVE_TICK;
  timeToDragStart = TIME_TO_DRAG_START;
  customZIndex$!: Observable<number>;
  onCardMovement$ = new BehaviorSubject<boolean>(false);

  cdkDropList = viewChild<CdkDropList>(CdkDropList);

  constructor(
    private readonly blockDataService: BlockDataService,
    private readonly cardEventsFacadeService: CardEventsFacadeService,
  ) {
    this.id = this.blockDataService.id;
    this.blockCard = this.blockDataService.block;

    this.blockCard.cards$.subscribe((a) => console.log(a));

    console.log(this.blockCard.cards$.value);

    effect(() => {
      console.log(this.cdkDropList());
    });
  }

  setValueChanges() {
    this.cardEventsFacadeService.onCardMove$$.subscribe(() => {
      if (!(this.cardEventsFacadeService.lastToBeHovered === this.id))
        this.isSelected = false;
    });

    this.customZIndex$ = this.cardEventsFacadeService.onCardMove$$.pipe(
      map((val) => (val ? 1000 : 0)),
    );

    fromEvent(window, 'resize')
      .pipe(startWith(window.innerWidth))
      .subscribe(() => {
        this.timeToDragStart =
          window.innerWidth <= DRAG_DELAY_BREAKPOINT ? TIME_TO_DRAG_START : 0;
      });
  }

  onMove(item: Icard, event: CdkDragMove<Icard>) {
    this.cardEventsFacadeService.setCardMove(true, item);
    this.cardEventsFacadeService.objectMove(event.pointerPosition.x);
    this.isSelected = true;
    this.onCardMovement$.next(true);
  }

  drop(event: CdkDragDrop<Icard[]>) {
    this.cardEventsFacadeService.setCardMove(false, undefined);
    this.cardEventsFacadeService.setLastToBeHovered(-1);
    this.isSelected = false;
    this.cardEventsFacadeService.drop(event);
    this.onCardMovement$.next(false);
  }

  setEntered() {
    if (!this.isSelected)
      this.cardEventsFacadeService.setLastToBeHovered(this.id);
    this.onCardMovement$.next(true);
  }

  setExited() {
    if (this.cardEventsFacadeService.lastToBeHovered === this.id)
      this.cardEventsFacadeService.setLastToBeHovered(-1);
    this.onCardMovement$.next(false);
  }
}
