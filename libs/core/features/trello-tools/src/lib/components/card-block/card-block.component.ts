import { ChangeDetectorRef, Component } from '@angular/core';
import { DragAndDropService } from '../../services/drag-and-drop/drag-and-drop.service';

@Component({
  selector: 'trello-card-block',
  templateUrl: './card-block.component.html',
  styleUrls: ['./card-block.component.scss'],
})
export class CardBlockComponent {
  constructor(
    readonly dragAndDropService: DragAndDropService,
    readonly cdr: ChangeDetectorRef
  ) {
    this.dragAndDropService.onMove$.subscribe(val => {
      if(!val) this.isSelectedBlock = false
    })
  }

  cards = Array.from({ length: 15 }, (_, i) => i + 1);
  drop = this.dragAndDropService.drop;

  isSelectedBlock = false;

  onMove() {
    if (this.dragAndDropService.onMove$.value) return;
    this.isSelectedBlock = true
    this.dragAndDropService.onMove$.next(true);
    this.cdr.detectChanges();
  }

  onDrop() {
    if (!this.dragAndDropService.onMove$.value) return;
    this.dragAndDropService.onMove$.next(false);
    this.cdr.detectChanges();
  }
}
