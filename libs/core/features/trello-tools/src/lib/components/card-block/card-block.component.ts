import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { IBlock } from '../../models/card.models';
import { CardListComponent } from '../card-list/card-list.component';

@Component({
  selector: 'trello-card-block',
  templateUrl: './card-block.component.html',
  styleUrls: ['./card-block.component.scss'],
})
export class CardBlockComponent implements AfterViewInit {
  @Input() isPreview = false;
  @Input() id = -1;
  @Input() blockCard!: IBlock;

  @ViewChild(CardListComponent, { static: false }) cardList?: CardListComponent;

  isSelectedBlock = false;

  ngAfterViewInit(): void {
    if (!this.cardList || this.isPreview) return;

    this.cardList.cardMove.subscribe((event) => (this.isSelectedBlock = event));
  }
}
