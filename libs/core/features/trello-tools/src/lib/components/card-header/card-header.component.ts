import { CdkMenuModule } from '@angular/cdk/menu';
import { AsyncPipe } from '@angular/common';
import { Component, Inject, Injector, viewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {
  BackdropContentDirective,
  BackdropStateService,
} from '@my-monorepo/core/features/backdrop-screen';
import { BLOCK_TOKEN, IBlockInstance, Icard } from '@my-monorepo/core/utlis';
import { BehaviorSubject, Observable, map, startWith } from 'rxjs';
import { CloseMenuDirective } from '../../directives/close-menu/close-menu.directive';
import { CardBlockEditComponent } from '../card-block-edit/card-block-edit.component';
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
    BackdropContentDirective,
  ],
})
export class CardHeaderComponent {
  id: number;
  title: string;
  cardLength$: Observable<number>;
  cards$: BehaviorSubject<Icard[]>;
  templateRect = viewChild(BackdropContentDirective);

  constructor(
    @Inject(BLOCK_TOKEN) private readonly cardBlock: IBlockInstance,
    private readonly injector: Injector,
    private readonly backdropStateService: BackdropStateService<unknown>,
  ) {
    this.id = cardBlock.id;
    this.title = cardBlock.block.name;
    this.cards$ = cardBlock.block.cards$;
    this.cardLength$ = cardBlock.block.cards$.pipe(
      startWith(cardBlock.block.cards$.value),
      map((cards) => cards.length),
    );
  }

  edit() {
    const domRect = this.templateRect()?.domRect;
    if (!domRect) return;

    this.backdropStateService.setBackDropState({
      component: CardBlockEditComponent,
      domRect: domRect,
      injector: this.getInjector(),
    });
  }

  getInjector() {
    return Injector.create({
      providers: [
        {
          provide: BLOCK_TOKEN,
          useValue: this.cardBlock,
        },
      ],
      parent: this.injector,
    });
  }
}
