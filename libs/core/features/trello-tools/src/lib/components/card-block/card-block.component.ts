import { AsyncPipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  Type,
  forwardRef,
  input,
  viewChild,
} from '@angular/core';
import { BLOCK_TOKEN, IBlock, IBlockInstance } from '@my-monorepo/core/utlis';
import { CardBlockHeightDirective } from '../../directives/card-block-height/cardBlock-height.directive';
import { CardFooterComponent } from '../card-footer/card-footer.component';
import { CardHeaderComponent } from '../card-header/card-header.component';
import { CardListComponent } from '../card-list/card-list.component';
import { Subject } from 'rxjs';
import { IN_OUT_HEIGHT_ANIMATION } from '../../animations/in-out-height';

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
export class CardBlockComponent implements IBlockInstance, AfterViewInit {
  id = input<number>(-1);
  isPreview = input<boolean>(false);
  block = input.required<IBlock>();
  cardList = viewChild(CardListComponent);
  onCardMovement$ = new Subject<void>();

  ngAfterViewInit(): void {
    this.cardList()?.onCardMovement$.subscribe(() =>
      this.onCardMovement$.next(),
    );
  }
}
