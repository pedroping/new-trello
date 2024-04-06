import { CdkMenuModule } from '@angular/cdk/menu';
import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CloseMenuDirective } from '../../directives/close-menu/close-menu.directive';
import { CardOptionsComponent } from '../card-list-options/card-list-options.component';
import { Icard } from '@my-monorepo/core/utlis';
import { BehaviorSubject } from 'rxjs';

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
  cardLength = input<number>(0);
  id = input<number>(-1);
  title = input.required<string>();
  cards$ = input.required<BehaviorSubject<Icard[]>>();
}
