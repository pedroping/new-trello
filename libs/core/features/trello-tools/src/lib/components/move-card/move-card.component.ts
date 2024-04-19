import { AsyncPipe } from '@angular/common';
import { Component, Inject, input } from '@angular/core';
import { BackdropStateService } from '@my-monorepo/core/features/backdrop-screen';
import { DbFacadeService } from '@my-monorepo/core/features/trello-db';
import {
  BLOCK_TOKEN,
  IBlock,
  IBlockInstance,
  Icard,
  IcardAsPropery,
} from '@my-monorepo/core/utlis';
import { map } from 'rxjs';

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
    @Inject(BLOCK_TOKEN) cardBlock: IBlockInstance,
    private readonly dbFacadeService: DbFacadeService,
    private readonly backdropStateService: BackdropStateService<IcardAsPropery>,
  ) {
    this.blockCard = cardBlock.block;
  }

  moveToBlock(block: IBlock) {
    const card = this.card();
    if (!card) return;

    card.blockId = block.id;
    card.cardIndex = this.blockCard.cards$.value.length;
    this.dbFacadeService.editCard(card).subscribe(() => {
      this.blockCard.cards$ = this.dbFacadeService.getCardsByBlockId(
        this.blockCard.id,
      );
      block.cards$ = this.dbFacadeService.getCardsByBlockId(block.id);
      this.backdropStateService.removeBackDrop();
    });
  }
}
