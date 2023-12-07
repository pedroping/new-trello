import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CallSetValueChanges } from '@my-monorepo/core/features/set-value-changes-decorator';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { CardEventsFacadeService } from '../../facades/card-events-facade.service';
import { Icard } from '../../models/card.models';
import { DragAndDropService } from '../../services/drag-and-drop/drag-and-drop.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
@CallSetValueChanges()
export class CardListComponent {
  @Input({ required: true }) cards: Icard[] = [];
  @Input({ required: true }) id = -1;
  @Input() addNewEvent$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  @Output() cardMove = new EventEmitter<boolean>();

  customZIndex$!: Observable<number>;

  constructor(
    private readonly cardEventsFacadeService: CardEventsFacadeService
  ) {}

  setValueChanges() {
    this.cardEventsFacadeService.onCardMove$$.subscribe((val) => {
      if (!val) this.cardMove.emit(false);
    });

    this.customZIndex$ = this.cardEventsFacadeService.onCardMove$$.pipe(
      map((val) => (val ? 1000 : 0))
    );
  }

  onMove() {
    this.cardEventsFacadeService.setCardMove(true);
    this.cardMove.emit(true);
  }

  onDrop() {
    this.cardEventsFacadeService.setCardMove(false);
    this.cardEventsFacadeService.setLastToBeHovered(-1);
    this.cardMove.emit(false);
  }

  drop(event: CdkDragDrop<Icard[]>) {
    this.cardEventsFacadeService.drop(event);
  }
}
