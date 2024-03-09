import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  DragDropModule,
} from '@angular/cdk/drag-drop';
import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  DragScrollDirective,
  PageWidthDirective,
} from '@my-monorepo/core/features/drag-scroll';
import { DbFacadeService } from '@my-monorepo/core/features/trello-db';
import {
  AddNewBlockComponent,
  CardBlockComponent,
  CardEventsFacadeService,
  CursorDraggingDirective,
} from '@my-monorepo/core/features/trello-tools';
import { IBlock } from '@my-monorepo/core/utlis';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  standalone: true,
  imports: [
    CdkDrag,
    AsyncPipe,
    RouterLink,
    CdkDropList,
    DragDropModule,
    CardBlockComponent,
    AddNewBlockComponent,
    PageWidthDirective,
    DragScrollDirective,
  ],
  hostDirectives: [CursorDraggingDirective],
})
export class HomePageComponent implements OnInit {
  blocks$$ = this.dbFacadeService.allBlocks$;

  constructor(
    private readonly cardEventsFacadeService: CardEventsFacadeService,
    private readonly dbFacadeService: DbFacadeService,
  ) {}

  ngOnInit(): void {
    this.cardEventsFacadeService.startDomain();
  }

  listDropped(event: CdkDragDrop<IBlock[]>) {
    this.cardEventsFacadeService.blockDrop(event);
  }

  onMove() {
    this.cardEventsFacadeService.onEvent(true);
  }
}
