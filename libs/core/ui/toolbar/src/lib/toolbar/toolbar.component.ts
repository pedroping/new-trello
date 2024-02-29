import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BehaviorSubject } from 'rxjs';
import { ToolbarService } from '../toolbar-service/toolbar.service';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule],
})
export class ToolbarComponent {
  menuEvent$: BehaviorSubject<boolean>;

  constructor(private readonly ToolbarService: ToolbarService) {
    this.menuEvent$ = this.ToolbarService.menuEvent$;
  }

  emitEvent() {
    this.menuEvent$.next(true);
  }
}
