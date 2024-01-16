import { Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CardEventsFacadeService } from '../../facades/card-events-facade.service';

@Component({
  selector: 'trello-card-footer',
  templateUrl: './card-footer.component.html',
  styleUrls: ['./card-footer.component.scss'],
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
