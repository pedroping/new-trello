import { AsyncPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { BackdropStateService } from '@my-monorepo/core/features/backdrop-screen';
import { DbFacadeService } from '@my-monorepo/core/features/trello-db';
import { IBlock, Icard, IcardAsProperty } from '@my-monorepo/core/utlis';
import { map } from 'rxjs';
import { BlockDataService } from '../../services/block-data/block-data.service';

@Component({
  selector: 'move-card',
  templateUrl: './move-card.component.html',
  styleUrls: ['./move-card.component.scss'],
  standalone: true,
  imports: [AsyncPipe],
})
export class MoveCardComponent {
  card = input<Icard | null>();
  blockCard: IBlock;

  blocks$$ = this.dbFacadeService.allBlocks$.pipe(
    map((blocks) => {
      return blocks.filter((block) => block.id != this.blockCard.id);
    }),
  );

  constructor(
    private readonly dbFacadeService: DbFacadeService,
    private readonly blockDataService: BlockDataService,
    private readonly backdropStateService: BackdropStateService<IcardAsProperty>,
  ) {
    this.blockCard = this.blockDataService.block;
  }

  moveToBlock(block: IBlock) {
    const card = this.card();
    if (!card) return;

    const oldId = card.id;
    card.blockId = block.id;
    card.cardIndex = block.cards$.value.length;
    this.dbFacadeService.editCard(card).subscribe(() => {
      const oldListCard = this.blockCard.cards$.value.filter(
        (card) => card.id != oldId,
      );
      this.blockCard.cards$.next(oldListCard);
      block.cards$.next([...block.cards$.value, card]);
      this.backdropStateService.removeBackDrop();
    });
  }
}
