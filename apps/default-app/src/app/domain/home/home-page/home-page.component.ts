import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CoreUiToolbarModule } from '@my-monorepo/core/ui/toolbar';
import { CoreUiSidenavModule } from '@my-monorepo/core/ui/sidenav';
import { ToolbarService } from '@my-monorepo/core/ui/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  standalone: true,
  imports: [
    CoreUiToolbarModule,
    MatIconModule,
    CoreUiSidenavModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
  ],
})
export class HomePageComponent implements OnInit {
  constructor(private readonly toolbarService: ToolbarService) {}

  ngOnInit() {}

  emitEvent() {
    this.toolbarService.menuEvent$.next(false);
  }
}
