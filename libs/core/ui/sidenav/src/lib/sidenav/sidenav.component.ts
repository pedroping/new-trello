import { NgClass } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { ToolbarService } from '@my-monorepo/core/ui/toolbar';

@Component({
  selector: 'sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  standalone: true,
  imports: [MatSidenavModule, NgClass],
})
export class SidenavComponent implements OnInit {
  @Input() hasClosedSidenav = true;
  @ViewChild('drawer') drawer?: MatDrawer;

  constructor(private readonly toolbarService: ToolbarService) {}

  ngOnInit() {
    this.toolbarService.menuEvent$.subscribe((value) => {
      if (value) this.drawer?.open();
      else this.drawer?.close();
    });
  }
}
