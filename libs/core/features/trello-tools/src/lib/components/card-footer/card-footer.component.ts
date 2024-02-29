import { Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CardEventsFacadeService } from '../../facades/card-events-facade.service';
import { CdkMenuModule } from '@angular/cdk/menu';
import { MatIconModule } from '@angular/material/icon';
import { CloseMenuDirective } from '../../directives/close-menu/close-menu.directive';
import { AsyncPipe } from '@angular/common';
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
})
export class CardFooterComponent {
  @Input() addNewEvent$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  onCardMove$$ = this.cardEventsFacadeService.onCardMove$$;

  constructor(
    private readonly cardEventsFacadeService: CardEventsFacadeService
  ) {}

  handleAddNew() {
    this.addNewEvent$.next(false);
    this.addNewEvent$.next(true);
  }
}
