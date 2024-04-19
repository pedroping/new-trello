import { AsyncPipe } from '@angular/common';
import { AfterViewInit, Component, Inject, viewChild } from '@angular/core';
import { BLOCK_TOKEN, IBlock, IBlockInstance } from '@my-monorepo/core/utlis';
import { Subject } from 'rxjs';
import { CardBlockHeightDirective } from '../../directives/card-block-height/cardBlock-height.directive';
import { CardFooterComponent } from '../card-footer/card-footer.component';
import { CardHeaderComponent } from '../card-header/card-header.component';
import { CardListComponent } from '../card-list/card-list.component';

@Component({
  selector: 'card-block-content',
  templateUrl: './card-block-content.component.html',
  styleUrls: ['./card-block-content.component.scss'],
  standalone: true,
  imports: [
    CardBlockHeightDirective,
    CardFooterComponent,
    CardHeaderComponent,
    CardListComponent,
    AsyncPipe,
  ],
})
export class CardBlockContentComponent implements AfterViewInit {
  block: IBlock;
  isPreview = false;
  cardList = viewChild(CardListComponent);
  onCardMovement$ = new Subject<void>();

  constructor(@Inject(BLOCK_TOKEN) cardBlock: IBlockInstance) {
    this.block = cardBlock.block;
  }

  ngAfterViewInit(): void {
    this.cardList()?.onCardMovement$.subscribe(() =>
      this.onCardMovement$.next(),
    );
  }
}
