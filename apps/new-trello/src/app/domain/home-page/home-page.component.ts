import {
  CdkDrag,
  CdkDragDrop,
  CdkDragMove,
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
  TIME_TO_DRAG_START,
} from '@my-monorepo/core/features/trello-tools';
import { IBlock } from '@my-monorepo/core/utlis';

@Component({
  selector: 'trello-home-page',
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
    PageWidthDirective,
    DragScrollDirective,
    AddNewBlockComponent,
  ],
  hostDirectives: [CursorDraggingDirective],
})
export class HomePageComponent implements OnInit {
  timeToDragStart = TIME_TO_DRAG_START;
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

  onMove(event: CdkDragMove<IBlock>) {
    this.cardEventsFacadeService.onEvent(true);
    this.cardEventsFacadeService.objectMove(event.pointerPosition.x);
  }
}
