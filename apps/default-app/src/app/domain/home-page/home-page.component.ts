import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CoreUiToolbarModule } from '@my-monorepo/core/ui/toolbar';
import { CoreUiSidenavModule } from '@my-monorepo/core/ui/sidenav';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  standalone: true,
  imports: [CoreUiToolbarModule, MatIconModule, CoreUiSidenavModule],
})
export class HomePageComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
