import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardEventsFacadeService } from '../../facades/card-events-facade.service';
import { Icard } from '../../models/card.models';

@Component({
  selector: 'move-card',
  templateUrl: './move-card.component.html',
  styleUrls: ['./move-card.component.scss'],
})
export class MoveCardComponent {
  @Input({ required: true }) card?: Icard;
  @Input({ required: true }) cards: Icard[] = [];
  @Output() close = new EventEmitter<void>();

  blocks$$ = this.cardEventsFacadeService.blocks$$;

  constructor(
    private readonly cardEventsFacadeService: CardEventsFacadeService
  ) {}

  moveToBlock(cards: Icard[]) {
    if (!this.card) return;
    this.cardEventsFacadeService.moveToBlock(this.cards, cards, this.card);
    this.close.emit();
  }
}
