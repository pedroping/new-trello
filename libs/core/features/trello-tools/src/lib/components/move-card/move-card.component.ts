import { AsyncPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { BackdropStateService } from '@my-monorepo/core/features/backdrop-screen';
import { DbFacadeService } from '@my-monorepo/core/features/trello-db';
import { IBlock, Icard } from '@my-monorepo/core/utlis';
import { map } from 'rxjs';

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

  blocks$$ = this.dbFacadeService.allBlocks$.pipe(
    map((blocks) => {
      return blocks.filter((block) => block.id != this.blockCard().id);
    }),
  );

  constructor(
    private readonly dbFacadeService: DbFacadeService,
    private readonly backdropStateService: BackdropStateService,
  ) {}

  moveToBlock(block: IBlock) {
    const card = this.card();
    if (!card) return;

    card.blockId = block.id;
    card.cardIndex = this.blockCard().cards$.value.length;

    const oldBlockCards = this.blockCard().cards$.value.filter(
      (bCard) => bCard.id != card.id,
    );
    const newBlocks = [...block.cards$.value, card];

    this.blockCard().cards$.next(oldBlockCards);
    block.cards$.next(newBlocks);
    this.dbFacadeService.editCard(card);
    this.backdropStateService.setBackDropState();
  }
}
