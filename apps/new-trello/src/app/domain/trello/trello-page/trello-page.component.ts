import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  DragScrollDirective,
  PageWidthDirective,
  PreventDragDirective,
} from '@my-monorepo/core/features/drag-scroll';
import { RightSidebarComponent } from '@my-monorepo/core/features/trello-right-sidebar';
import { TrelloWorkspaceComponent } from '@my-monorepo/core/features/trello-tools';
import {
  GenericSidenavComponent,
  GenericSidenavsFacadeService,
} from '@my-monorepo/core/ui/generic-sidenavs';
import { ToolbarComponent } from '@my-monorepo/core/ui/toolbar';
import { ToolbarContentComponent } from '../../../core/toolbar-content/toolbar-content.component';
@Component({
  selector: 'trello-trello-page',
  templateUrl: './trello-page.component.html',
  styleUrls: ['./trello-page.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    DragDropModule,
    PageWidthDirective,
    DragScrollDirective,
    ToolbarComponent,
    ToolbarContentComponent,
    GenericSidenavComponent,
    RightSidebarComponent,
    PreventDragDirective,
    CdkScrollable,
    TrelloWorkspaceComponent,
  ],
})
export class TrelloPageComponent implements OnInit {
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

/* 
  To update code dependecies 

  - npx nx migrate latest
  - npx npm-check-updates -u
  - npm update
  - npm i


  Nx Comands

  - npx nx generate @nrwl/angular:library --name=expand-table  --directory=core/features
  - npm install @angular/pwa --save-dev
  - nx g @angular/pwa:ng-add --project *project-name*
  - npx nx g @angular/material:ng-add --project=new-trello
*/
