import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToolbarService } from '../../services/toolbar/toolbar.service';
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  menuEvent$: BehaviorSubject<boolean>;

  constructor(private readonly ToolbarService: ToolbarService) {
    this.menuEvent$ = this.ToolbarService.menuEvent$;
  }

  emitEvent() {
    this.menuEvent$.next(!this.menuEvent$.value);
  }
}
