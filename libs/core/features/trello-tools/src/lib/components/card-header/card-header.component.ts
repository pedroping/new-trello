import { Component, Input } from '@angular/core';

@Component({
  selector: 'trello-card-header',
  templateUrl: './card-header.component.html',
  styleUrls: ['./card-header.component.scss'],
})
export class CardHeaderComponent {
  @Input() cardLength = 0;
  @Input({ required: true }) title = '';
}
