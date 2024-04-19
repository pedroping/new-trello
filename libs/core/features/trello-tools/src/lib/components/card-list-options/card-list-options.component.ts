import { CdkMenuTrigger } from '@angular/cdk/menu';
import { Component, Inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DbFacadeService } from '@my-monorepo/core/features/trello-db';
import { BLOCK_TOKEN, IBlockInstance, Icard } from '@my-monorepo/core/utlis';
import { BehaviorSubject } from 'rxjs';
import { CardEventsFacadeService } from '../../facades/card-events-facade.service';

@Component({
  selector: 'trello-card-list-options',
  templateUrl: './card-list-options.component.html',
  styleUrls: ['./card-list-options.component.scss'],
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
})
export class CardOptionsComponent {
  listId: number;
  cards$: BehaviorSubject<Icard[]>;
  cdkTrigger = input.required<CdkMenuTrigger>();

  constructor(
    @Inject(BLOCK_TOKEN) cardBlock: IBlockInstance,
    private readonly dbFacadeService: DbFacadeService,
    private readonly cardEventsFacadeService: CardEventsFacadeService,
  ) {
    this.listId = cardBlock.id;
    this.cards$ = cardBlock.block.cards$;
  }

  closeMenu() {
    this.cdkTrigger().close();
  }

  archiveList() {
    this.dbFacadeService.deleteBlock(this.listId).subscribe(() => {
      this.dbFacadeService.setAllElements();
    });
    this.closeMenu();
  }

  orderListByName() {
    const orderedCards = this.cards$.value.sort((a, b) =>
      a.name > b.name ? 1 : b.name > a.name ? -1 : 0,
    );
    this.cards$.next(orderedCards);
    this.cardEventsFacadeService.validCardsOrder(this.listId, this.listId);
    this.closeMenu();
  }

  orderListById() {
    const orderedCards = this.cards$.value
      .filter((card) => !!card.id || card.id === 0)
      .sort((a, b) => a.id - b.id);
    this.cards$.next(orderedCards);
    this.cardEventsFacadeService.validCardsOrder(this.listId, this.listId);
    this.closeMenu();
  }
}
