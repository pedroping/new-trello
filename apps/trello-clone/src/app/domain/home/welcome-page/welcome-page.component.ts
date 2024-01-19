import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreFeaturesDragScrollModule } from '@my-monorepo/core/features/drag-scroll';
import {
  CoreUiGenericSidenavsModule,
  GenericSidenavsFacadeService,
} from '@my-monorepo/core/ui/generic-sidenavs';
import { CoreUiToolbarModule } from '@my-monorepo/core/ui/toolbar';
import { ToolbarContentComponent } from '../../../core/toolbar-content/toolbar-content.component';
@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DragDropModule,
    CoreUiToolbarModule,
    ToolbarContentComponent,
    CoreUiGenericSidenavsModule,
    CoreFeaturesDragScrollModule,
  ],
})
export class WelcomePageComponent implements OnInit {
  @ViewChild('pageContent', { static: true }) pageContent!: ElementRef;

  constructor(
    private readonly genericSidenavsFacadeService: GenericSidenavsFacadeService
  ) {}

  ngOnInit(): void {
    this.genericSidenavsFacadeService.startDomain(
      this.pageContent.nativeElement
    );
  }
}
