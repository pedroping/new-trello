import {
  AfterViewInit,
  Component,
  Type,
  forwardRef,
  input,
  viewChild,
} from '@angular/core';
import { CardBlockHeightDirective } from '../../directives/card-block-height/cardBlock-height.directive';
import { BLOCK_TOKEN, IBlock, IBlockInstance } from '@my-monorepo/core/utlis';
import { CardFooterComponent } from '../card-footer/card-footer.component';
import { CardHeaderComponent } from '../card-header/card-header.component';
import { CardListComponent } from '../card-list/card-list.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'trello-card-block',
  templateUrl: './card-block.component.html',
  styleUrls: ['./card-block.component.scss'],
  standalone: true,
  imports: [
    CardBlockHeightDirective,
    CardFooterComponent,
    CardHeaderComponent,
    CardListComponent,
    AsyncPipe,
  ],
  providers: [
    {
      provide: BLOCK_TOKEN,
      useExisting: forwardRef(() => CardBlockComponent) as Type<IBlockInstance>,
    },
  ],
})
export class CardBlockComponent implements AfterViewInit, IBlockInstance {
  isPreview = input<boolean>(false);
  id = input<number>(-1);
  blockCard = input.required<IBlock>();
  cardList = viewChild(CardListComponent);
  isSelectedBlock = false;

  ngAfterViewInit(): void {
    const cardList = this.cardList();
    if (!cardList || this.isPreview()) return;

    cardList.cardMove.subscribe((event) => (this.isSelectedBlock = event));
  }
}
