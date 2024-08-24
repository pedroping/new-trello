import { AsyncPipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  input,
  OnInit,
  viewChild
} from '@angular/core';
import { IBlock } from '@my-monorepo/core/utlis';
import { Subject } from 'rxjs';
import { CardBlockHeightDirective } from '../../directives/card-block-height/cardBlock-height.directive';
import { BlockDataService } from '../../services/block-data/block-data.service';
import { CardFooterComponent } from '../card-footer/card-footer.component';
import { CardHeaderComponent } from '../card-header/card-header.component';
import { CardListComponent } from '../card-list/card-list.component';

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
  providers: [BlockDataService],
})
export class CardBlockComponent implements OnInit, AfterViewInit {
  blockId = input.required<number>({ alias: 'id' });
  isPreview = input<boolean>(false, { alias: 'isPreview' });
  blockContent = input.required<IBlock>({ alias: 'block' });

  onCardMovement$ = new Subject<void>();
  cardList = viewChild(CardListComponent);

  constructor(private readonly blockDataService: BlockDataService) {}

  ngOnInit(): void {
    this.blockDataService.setId(this.blockId());
    this.blockDataService.setBlock(this.blockContent());
  }

  ngAfterViewInit(): void {
    this.cardList()?.onCardMovement$.subscribe(() =>
      this.onCardMovement$.next(),
    );
  }
}
