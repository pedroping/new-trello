import { CdkMenuModule } from '@angular/cdk/menu';
import { AsyncPipe } from '@angular/common';
import { Component, ElementRef, Inject, Injector } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { BackdropStateService } from '@my-monorepo/core/features/backdrop-screen';
import {
  BLOCK_TOKEN,
  IBlock,
  IBlockInstance,
  Icard,
} from '@my-monorepo/core/utlis';
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
  ],
})
export class CardHeaderComponent {
  id: number;
  block: IBlock;
  cardLength$: Observable<number>;
  cards$: BehaviorSubject<Icard[]>;

  constructor(
    private readonly injector: Injector,
    private readonly elementRef: ElementRef<HTMLElement>,
    @Inject(BLOCK_TOKEN) private readonly cardBlock: IBlockInstance,
    private readonly backdropStateService: BackdropStateService<unknown>,
  ) {
    this.id = cardBlock.id;
    this.block = cardBlock.block;
    this.cards$ = cardBlock.block.cards$;
    this.cardLength$ = cardBlock.block.cards$.pipe(
      startWith(cardBlock.block.cards$.value),
      map((cards) => cards.length),
    );
  }

  edit() {
    const domRect = this.getParentRect();
    if (!domRect) return;

    this.backdropStateService.setBackDropState({
      useSize: true,
      domRect: domRect,
      injector: this.getInjector(),
      component: CardBlockEditComponent,
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

  getParentRect() {
    return this.elementRef.nativeElement.parentElement?.getBoundingClientRect();
  }
}
