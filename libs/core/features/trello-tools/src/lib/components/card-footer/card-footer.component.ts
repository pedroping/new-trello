import { CdkMenuModule } from '@angular/cdk/menu';
import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
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
})
export class CardFooterComponent {
  addNewEvent$: BehaviorSubject<boolean>;
  onCardMove$$ = this.cardEventsFacadeService.onCardMove$$;

  constructor(
    private readonly blockDataService: BlockDataService,
    private readonly cardEventsFacadeService: CardEventsFacadeService,
  ) {
    this.addNewEvent$ = this.blockDataService.block.addNewEvent$;
  }

  handleAddNew() {
    this.addNewEvent$.next(false);
    this.addNewEvent$.next(true);
  }
}
