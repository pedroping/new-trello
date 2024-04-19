import { CdkMenuModule } from '@angular/cdk/menu';
import { AsyncPipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { BLOCK_TOKEN, IBlockInstance, Icard } from '@my-monorepo/core/utlis';
import { BehaviorSubject, Observable, map, startWith } from 'rxjs';
import { CloseMenuDirective } from '../../directives/close-menu/close-menu.directive';
import { CardOptionsComponent } from '../card-list-options/card-list-options.component';

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
    this.id = cardBlock.id;
    this.title = cardBlock.block.name;
    this.cards$ = cardBlock.block.cards$;
    this.cardLength$ = cardBlock.block.cards$.pipe(
      startWith(cardBlock.block.cards$.value),
      map((cards) => cards.length),
    );
  }
}
