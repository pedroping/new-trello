import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { DragAndDropService } from '../../services/drag-and-drop/drag-and-drop.service';

@Component({
  selector: 'trello-card-block',
  templateUrl: './card-block.component.html',
  styleUrls: ['./card-block.component.scss'],
})
export class CardBlockComponent {
  @Input() isPreview = false;
  @Input({ required: true }) title = '';
  @Input({ required: true }) cards: number[] = [];

  constructor(
    readonly dragAndDropService: DragAndDropService,
    readonly cdr: ChangeDetectorRef
  ) {
    this.dragAndDropService.onCardMove$.subscribe((val) => {
      if (!val) this.isSelectedBlock = false;
    });
  }

  drop = this.dragAndDropService.drop;

  isSelectedBlock = false;

  onMove() {
    this.isSelectedBlock = true;
    this.dragAndDropService.onCardMove$.next(true);
    this.cdr.detectChanges();
  }

  onDrop() {
    this.dragAndDropService.onCardMove$.next(false);
    this.cdr.detectChanges();
  }
}
