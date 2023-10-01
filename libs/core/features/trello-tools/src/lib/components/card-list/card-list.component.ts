import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { DragAndDropService } from '../../services/drag-and-drop/drag-and-drop.service';

@Component({
  selector: 'card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent implements OnInit {
  @Input({ required: true }) cards: number[] = [];
  @Output() cardMove = new EventEmitter<boolean>();

  readonly dragAndDropService = inject(DragAndDropService);
  private readonly cdr = inject(ChangeDetectorRef);
  drop = this.dragAndDropService.drop.bind(this.dragAndDropService);

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
    this.cardMove.emit(false);
    this.cdr.detectChanges();
  }
}
