import { Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'trello-card-footer',
  templateUrl: './card-footer.component.html',
  styleUrls: ['./card-footer.component.scss'],
})
export class CardFooterComponent {
  @Input() addNewEvent$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  handelAddNew(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.addNewEvent$.next(true);
  }
}
