import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Icard } from '../../models/card.models';

@Component({
  selector: 'trello-card-block',
  templateUrl: './card-block.component.html',
  styleUrls: ['./card-block.component.scss'],
})
export class CardBlockComponent {
  @Input() isPreview = false;
  @Input() title = '';
  @Input() cards: Icard[] = [];
  @Input() id = -1;
  @Input() addNewEvent$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  isSelectedBlock = false;

  constructor(readonly cdr: ChangeDetectorRef) {}

  cardMove(event: boolean) {
    this.isSelectedBlock = event;
  }
}
