import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { IBlock } from '../../models/card.models';

@Component({
  selector: 'trello-card-block',
  templateUrl: './card-block.component.html',
  styleUrls: ['./card-block.component.scss'],
})
export class CardBlockComponent {
  @Input() isPreview = false;
  @Input() id = -1;
  @Input({ required: true }) blockCard!: IBlock;

  isSelectedBlock = false;

  constructor(readonly cdr: ChangeDetectorRef) {}

  cardMove(event: boolean) {
    this.isSelectedBlock = event;
  }
}
