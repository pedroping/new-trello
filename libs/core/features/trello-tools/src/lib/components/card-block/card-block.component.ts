import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { DragAndDropService } from '../../services/drag-and-drop/drag-and-drop.service';

@Component({
  selector: 'trello-card-block',
  templateUrl: './card-block.component.html',
  styleUrls: ['./card-block.component.scss'],
})
export class CardBlockComponent {
  @Input() isPreview = false;
  @Input() title = '';
  @Input() cards: number[] = [];
  @Input() id = -1;
  constructor(
    readonly dragAndDropService: DragAndDropService,
    readonly cdr: ChangeDetectorRef
  ) {}

  isSelectedBlock = false;

  cardMove(event: boolean) {
    this.isSelectedBlock = event;
  }
}
