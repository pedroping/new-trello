import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { ToolbarService } from '@my-monorepo/core/ui/toolbar';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  @Input() hasClosedSidenav: boolean = true;
  @ViewChild('drawer') drawer?: MatDrawer;

  constructor(private readonly toolbarService: ToolbarService) {}

  ngOnInit() {
    this.toolbarService.menuEvent$.subscribe(() => {
      this.drawer?.open();
    });
  }
}
