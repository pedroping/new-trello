import { AsyncPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { BackdropStateService } from '@my-monorepo/core/features/backdrop-screen';
import { CardEventsFacadeService } from '../../facades/card-events-facade.service';
import { IBlock, Icard } from '../../models/card.models';

@Component({
  selector: 'move-card',
  templateUrl: './move-card.component.html',
  styleUrls: ['./move-card.component.scss'],
  standalone: true,
  imports: [AsyncPipe],
})
export class MoveCardComponent {
  card = input<Icard>();
  blockCard = input.required<IBlock>();

  blocks$$ = this.cardEventsFacadeService.blocks$$;

  constructor(
    private readonly backdropStateService: BackdropStateService,
    private readonly cardEventsFacadeService: CardEventsFacadeService,
  ) {}

  moveToBlock(cards: Icard[]) {
    if (!this.card()) return;
    this.cardEventsFacadeService.moveToBlock(
      this.blockCard().cards,
      cards,
      this.card()!,
    );
    this.backdropStateService.setBackDropState();
  }
}
