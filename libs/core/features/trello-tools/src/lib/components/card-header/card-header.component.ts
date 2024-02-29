import { CdkMenuModule } from '@angular/cdk/menu';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CloseMenuDirective } from '../../directives/close-menu/close-menu.directive';
import { CardOptionsComponent } from '../card-options/card-options.component';

@Component({
  selector: 'trello-card-header',
  templateUrl: './card-header.component.html',
  styleUrls: ['./card-header.component.scss'],
  standalone: true,
  imports: [
    CdkMenuModule,
    MatIconModule,
    CloseMenuDirective,
    CardOptionsComponent,
  ],
})
export class CardHeaderComponent {
  @Input() cardLength = 0;
  @Input({ required: true }) title = '';
}
