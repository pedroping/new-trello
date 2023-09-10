import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CoreFeaturesDarkModeModule } from '@my-monorepo/core/features/dark-mode';
import { ToolbarService } from '@my-monorepo/core/ui/toolbar';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-toolBar',
  templateUrl: './toolBar.component.html',
  styleUrls: ['./toolBar.component.scss'],
  standalone: true,
  imports: [MatIconModule, CoreFeaturesDarkModeModule, MatButtonModule],
})
export class ToolBarComponent {
  menuEvent$: BehaviorSubject<boolean>;

  constructor(private readonly toolbarService: ToolbarService) {
    this.menuEvent$ = this.toolbarService.menuEvent$;
  }

  emitEvent() {
    this.menuEvent$.next(true);
  }
}
