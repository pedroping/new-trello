import { CdkMenuModule } from '@angular/cdk/menu';
import { AsyncPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { BehaviorSubject } from 'rxjs';
import { CloseMenuDirective } from '../../directives/close-menu/close-menu.directive';
import { FooterTopDirective } from '../../directives/footer-top/footer-top.directive';
import { CardEventsFacadeService } from '../../facades/card-events-facade.service';
import { CardOptionsComponent } from '../card-options/card-options.component';

@Component({
  selector: 'trello-card-footer',
  templateUrl: './card-footer.component.html',
  styleUrls: ['./card-footer.component.scss'],
  standalone: true,
  imports: [
    CdkMenuModule,
    MatIconModule,
    CloseMenuDirective,
    AsyncPipe,
    CardOptionsComponent,
  ],
  hostDirectives: [
    {
      directive: FooterTopDirective,
      inputs: ['id', 'length', 'addNewEvent$'],
    },
  ],
})
export class CardFooterComponent {
  addNewEvent$ = input.required<BehaviorSubject<boolean>>();
  onCardMove$$ = this.cardEventsFacadeService.onCardMove$$;
  id = input<number>(-1);

  constructor(
    private readonly cardEventsFacadeService: CardEventsFacadeService,
  ) {}

  handleAddNew() {
    this.addNewEvent$().next(false);
    this.addNewEvent$().next(true);
  }
}
