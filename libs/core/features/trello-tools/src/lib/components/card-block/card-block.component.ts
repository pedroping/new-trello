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
  @Input({ required: true }) id: number = -1;

  window = window
  
  constructor(
    readonly dragAndDropService: DragAndDropService,
    readonly cdr: ChangeDetectorRef
  ) {}

  isSelectedBlock = false;

  cardMove(event: boolean) {
    this.isSelectedBlock = event;
  }
}
