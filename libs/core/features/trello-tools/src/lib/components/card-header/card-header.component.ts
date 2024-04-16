import { CdkMenuModule } from '@angular/cdk/menu';
import { Component, Inject, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CloseMenuDirective } from '../../directives/close-menu/close-menu.directive';
import { CardOptionsComponent } from '../card-list-options/card-list-options.component';
import { BLOCK_TOKEN, IBlockInstance, Icard } from '@my-monorepo/core/utlis';
import { BehaviorSubject, Observable, map, startWith } from 'rxjs';
import { CardBlockComponent } from '../card-block/card-block.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'trello-card-header',
  templateUrl: './card-header.component.html',
  styleUrls: ['./card-header.component.scss'],
  standalone: true,
  imports: [
    AsyncPipe,
    CdkMenuModule,
    MatIconModule,
    CloseMenuDirective,
    CardOptionsComponent,
  ],
})
export class CardHeaderComponent {
  id: number;
  title: string;
  cardLength$: Observable<number>;
  cards$: BehaviorSubject<Icard[]>;

  constructor(@Inject(BLOCK_TOKEN) cardBlock: IBlockInstance) {
    this.id = cardBlock.id();
    this.title = cardBlock.blockCard().name;
    this.cards$ = cardBlock.blockCard().cards$;
    this.cardLength$ = cardBlock.blockCard().cards$.pipe(
      startWith(cardBlock.blockCard().cards$.value),
      map((cards) => cards.length),
    );

    cardBlock.blockCard().cards$.subscribe(console.log);
  }
}
