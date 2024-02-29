import {
  CdkDragDrop,
  CdkDropList,
  DragDropModule,
} from '@angular/cdk/drag-drop';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { CallSetValueChanges } from '@my-monorepo/core/features/set-value-changes-decorator';
import { Observable, map } from 'rxjs';
import { ScrollToEndDirective } from '../../directives/scroll-to-end/scroll-to-end.directive';
import { CardEventsFacadeService } from '../../facades/card-events-facade.service';
import { IBlock, Icard } from '../../models/card.models';
import { CardComponent } from '../card/card.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
  standalone: true,
  imports: [DragDropModule, ScrollToEndDirective, CardComponent, AsyncPipe],
})
@CallSetValueChanges()
export class CardListComponent {
  @Input({ required: true }) id = -1;
  @Input({ required: true }) blockCard!: IBlock;
  @Input() isSelected?: boolean;
  @Output() cardMove = new EventEmitter<boolean>();
  @ViewChild(CdkDropList, { static: true }) list!: CdkDropList;

  customZIndex$!: Observable<number>;
  scrollMoveTick = 5;

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

  setEntered() {
    if (!this.isSelected)
      this.cardEventsFacadeService.setLastToBeHovered(this.id);
  }

  setExited() {
    if (this.cardEventsFacadeService.lastToBeHovered === this.id)
      this.cardEventsFacadeService.setLastToBeHovered(-1);
  }
}
