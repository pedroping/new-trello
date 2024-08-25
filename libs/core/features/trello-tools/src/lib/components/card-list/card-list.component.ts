import {
  CdkDrag,
  CdkDragDrop,
  CdkDragMove,
  DragDropModule,
} from '@angular/cdk/drag-drop';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, effect, viewChildren } from '@angular/core';
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
import { PreviewCardHeightDirective } from '../../directives/preview-card-height/preview-card-height.directive';

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
    PreviewCardHeightDirective,
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

  cdkDrag = viewChildren<CdkDrag>(CdkDrag);

  constructor(
    private readonly blockDataService: BlockDataService,
    private readonly cardEventsFacadeService: CardEventsFacadeService,
  ) {
    this.id = this.blockDataService.id;
    this.blockCard = this.blockDataService.block;

    effect(() => {
      const allElements = this.cdkDrag().map(
        (cdkDrag) => cdkDrag.element.nativeElement,
      );

      const allHeight = allElements.reduce((a, b) => a + b.offsetHeight, 0);

      this.blockDataService.setCardsHeight(allHeight);
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

  onMove(item: Icard, event: CdkDragMove<Icard>, elementHeight: number) {
    this.cardEventsFacadeService.setCardMove(true, item, elementHeight);
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
