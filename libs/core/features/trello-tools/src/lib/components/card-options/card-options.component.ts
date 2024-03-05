import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'trello-card-options',
  templateUrl: './card-options.component.html',
  styleUrls: ['./card-options.component.scss'],
  standalone: true,
  imports: [MatIconModule]
})
export class CardOptionsComponent {}
