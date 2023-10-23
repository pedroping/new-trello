import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { DragAndDropService } from '../../services/drag-and-drop/drag-and-drop.service';
import { Icard } from '../../models/card.models';

@Component({
  selector: 'card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent implements OnInit {
  @Input({ required: true }) cards: Icard[] = [];
  @Input({ required: true }) id: number = -1;
  @Input() addNewEvent$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  @Output() cardMove = new EventEmitter<boolean>();

  readonly dragAndDropService = inject(DragAndDropService);
  private readonly cdr = inject(ChangeDetectorRef);
  drop = this.dragAndDropService.drop;

  customZIndex$ = this.dragAndDropService.onCardMove$.pipe(
    map((val) => (val ? 1000 : 0))
  );

  ngOnInit(): void {
    this.dragAndDropService.onCardMove$.subscribe((val) => {
      if (!val) this.cardMove.emit(false);
    });
  }

  onMove() {
    this.dragAndDropService.onCardMove$.next(true);
    this.cardMove.emit(true);
    this.cdr.detectChanges();
  }

  onDrop() {
    this.dragAndDropService.onCardMove$.next(false);
    this.dragAndDropService.lastToBeHovered = -1;
    this.cardMove.emit(false);
    this.cdr.detectChanges();
  }
}
