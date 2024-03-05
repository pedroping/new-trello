import { DragDropModule } from '@angular/cdk/drag-drop';

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  DragScrollDirective,
  PageWidthDirective,
} from '@my-monorepo/core/features/drag-scroll';
import {
  GenericSidenavComponent,
  GenericSidenavsFacadeService,
} from '@my-monorepo/core/ui/generic-sidenavs';
import { ToolbarComponent } from '@my-monorepo/core/ui/toolbar';
import { LeftSidebarContentComponent } from '../../../core/left-sidebar-content/left-sidebar-content.component';
import { RightSidebarContentComponent } from '../../../core/right-sidebar-content/right-sidebar-content.component';
import { ToolbarContentComponent } from '../../../core/toolbar-content/toolbar-content.component';
@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    DragDropModule,
    PageWidthDirective,
    DragScrollDirective,
    ToolbarComponent,
    ToolbarContentComponent,
    GenericSidenavComponent,
    LeftSidebarContentComponent,
    RightSidebarContentComponent,
  ],
})
export class WelcomePageComponent implements OnInit {
  @ViewChild('pageContent', { static: true }) pageContent!: ElementRef;

  constructor(
    private readonly genericSidenavsFacadeService: GenericSidenavsFacadeService,
  ) {}

  ngOnInit(): void {
    this.genericSidenavsFacadeService.startDomain(
      this.pageContent.nativeElement,
    );
  }
}
