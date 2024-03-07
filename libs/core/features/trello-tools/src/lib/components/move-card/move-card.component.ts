import { AsyncPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { BackdropStateService } from '@my-monorepo/core/features/backdrop-screen';
import { DbFacadeService } from '@my-monorepo/core/features/trello-db';
import { Observable, merge } from 'rxjs';
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

  blocks$$ = this.dbFacadeService.allBlocks$;

  constructor(
    private readonly dbFacadeService: DbFacadeService,
    private readonly backdropStateService: BackdropStateService,
    private readonly cardEventsFacadeService: CardEventsFacadeService,
  ) {}

  moveToBlock(cards$: Observable<Icard[]>) {
    if (!this.card()) return;

    merge(cards$, this.blockCard().cards$).subscribe(
      ([cardsToRemove, cardsToAdd]) => {
        this.cardEventsFacadeService.moveToBlock(
          [cardsToRemove],
          [cardsToAdd],
          this.card()!,
        );
        this.backdropStateService.setBackDropState();
      },
    );
  }
}
