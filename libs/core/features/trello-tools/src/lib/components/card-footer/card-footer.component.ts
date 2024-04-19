import { CdkMenuModule } from '@angular/cdk/menu';
import { AsyncPipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { BLOCK_TOKEN, IBlockInstance } from '@my-monorepo/core/utlis';
import { BehaviorSubject } from 'rxjs';
import { CloseMenuDirective } from '../../directives/close-menu/close-menu.directive';
import { FooterTopDirective } from '../../directives/footer-top/footer-top.directive';
import { CardEventsFacadeService } from '../../facades/card-events-facade.service';

@Component({
  selector: 'trello-card-footer',
  templateUrl: './card-footer.component.html',
  styleUrls: ['./card-footer.component.scss'],
  standalone: true,
  imports: [CdkMenuModule, MatIconModule, CloseMenuDirective, AsyncPipe],
  hostDirectives: [
    {
      directive: FooterTopDirective,
      inputs: ['onCardMovement$'],
    },
  ],
})
export class CardFooterComponent {
  addNewEvent$: BehaviorSubject<boolean>;
  onCardMove$$ = this.cardEventsFacadeService.onCardMove$$;

  constructor(
    @Inject(BLOCK_TOKEN) cardBlock: IBlockInstance,
    private readonly cardEventsFacadeService: CardEventsFacadeService,
  ) {
    this.addNewEvent$ = cardBlock.block.addNewEvent$;
  }

  handleAddNew() {
    this.addNewEvent$.next(false);
    this.addNewEvent$.next(true);
  }
}
