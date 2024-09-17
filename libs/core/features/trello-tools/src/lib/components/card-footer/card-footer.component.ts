import { CdkMenuModule } from '@angular/cdk/menu';
import { AsyncPipe } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { BehaviorSubject } from 'rxjs';
import { CloseMenuDirective } from '../../directives/close-menu/close-menu.directive';
import { CardEventsFacadeService } from '../../facades/card-events-facade.service';
import { BlockDataService } from '../../services/block-data/block-data.service';

@Component({
  selector: 'trello-card-footer',
  templateUrl: './card-footer.component.html',
  styleUrls: ['./card-footer.component.scss'],
  standalone: true,
  imports: [CdkMenuModule, MatIconModule, CloseMenuDirective, AsyncPipe],
  host: {
    '[class.noData]': 'noData()',
  },
})
export class CardFooterComponent implements OnInit {
  addNewEvent$: BehaviorSubject<boolean>;
  onCardMove$$ = this.cardEventsFacadeService.onCardMove$$;
  noData = signal<boolean>(false);

  constructor(
    private readonly blockDataService: BlockDataService,
    private readonly cardEventsFacadeService: CardEventsFacadeService,
  ) {
    this.addNewEvent$ = this.blockDataService.block.addNewEvent$;
  }

  ngOnInit(): void {
    this.blockDataService.block.cards$.subscribe((cards) =>
      this.noData.set(cards.length <= 0),
    );
  }

  handleAddNew() {
    this.addNewEvent$.next(false);
    this.addNewEvent$.next(true);
  }
}
