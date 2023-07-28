import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ToolbarService } from '@my-monorepo/core/ui/toolbar';

@Component({
  selector: 'app-sideNav',
  templateUrl: './sideNav.component.html',
  styleUrls: ['./sideNav.component.scss'],
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
})
export class SideNavComponent implements OnInit {
  constructor(private readonly toolbarService: ToolbarService) {}

  ngOnInit() {}

  emitEvent() {
    this.toolbarService.menuEvent$.next(false);
  }
}
