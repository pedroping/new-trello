import {
  CdkDragDrop,
  CdkDragMove,
  DragDropModule,
} from '@angular/cdk/drag-drop';
import { AsyncPipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { CallSetValueChanges } from '@my-monorepo/core/features/set-value-changes-decorator';
import {
  BLOCK_TOKEN,
  IBlock,
  IBlockInstance,
  Icard,
} from '@my-monorepo/core/utlis';
import { Observable, Subject, map } from 'rxjs';
import { ScrollToEndDirective } from '../../directives/scroll-to-end/scroll-to-end.directive';
import { CardEventsFacadeService } from '../../facades/card-events-facade.service';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
  standalone: true,
  imports: [DragDropModule, ScrollToEndDirective, CardComponent, AsyncPipe],
})
@CallSetValueChanges()
export class CardListComponent {
  id: number;
  blockCard: IBlock;
  isSelected = true;
  scrollMoveTick = 5;
  customZIndex$!: Observable<number>;
  onCardMovement$ = new Subject<void>();

  constructor(
    @Inject(BLOCK_TOKEN) cardBlock: IBlockInstance,
    private readonly cardEventsFacadeService: CardEventsFacadeService,
  ) {
    this.id = cardBlock.id;
    this.blockCard = cardBlock.block;
  }

  setValueChanges() {
    this.cardEventsFacadeService.onCardMove$$.subscribe(() => {
      if (!(this.cardEventsFacadeService.lastToBeHovered === this.id))
        this.isSelected = false;
    });

    this.customZIndex$ = this.cardEventsFacadeService.onCardMove$$.pipe(
      map((val) => (val ? 1000 : 0)),
    );
  }

  onMove(item: Icard, event: CdkDragMove<Icard>) {
    this.cardEventsFacadeService.setCardMove(true, item);
    this.cardEventsFacadeService.objectMove(event.pointerPosition.x);
    this.isSelected = true;
    this.onCardMovement$.next();
  }

  drop(event: CdkDragDrop<Icard[]>) {
    this.cardEventsFacadeService.setCardMove(false, undefined);
    this.cardEventsFacadeService.setLastToBeHovered(-1);
    this.isSelected = false;
    this.cardEventsFacadeService.drop(event);
  }

  setEntered() {
    if (!this.isSelected)
      this.cardEventsFacadeService.setLastToBeHovered(this.id);
    this.onCardMovement$.next();
  }

  setExited() {
    if (this.cardEventsFacadeService.lastToBeHovered === this.id)
      this.cardEventsFacadeService.setLastToBeHovered(-1);
    this.onCardMovement$.next();
  }
}
