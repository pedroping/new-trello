import { NgClass } from '@angular/common';
import { Component, OnInit, computed, input, viewChild } from '@angular/core';
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
  hasClosedSidenav = input<boolean>(true);
  drawer = viewChild<MatDrawer>('drawer');
  drawerClass = computed(() =>
    this.hasClosedSidenav() ? 'drawer-content' : '',
  );
  constructor(private readonly toolbarService: ToolbarService) {}

  ngOnInit() {
    this.toolbarService.menuEvent$.subscribe((value) => {
      if (value) this.drawer()?.open();
      else this.drawer()?.close();
    });
  }
}
