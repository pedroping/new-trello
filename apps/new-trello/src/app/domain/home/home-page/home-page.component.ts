import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { AsyncPipe } from '@angular/common';
import { Component, Injector, OnInit } from '@angular/core';
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
  ClearMocks,
  CursorDraggingDirective,
  IBlock,
} from '@my-monorepo/core/features/trello-tools';

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
@ClearMocks()
export class HomePageComponent implements OnInit {
  blocks$$ = this.bbFacadeService.allBlocks$;
  injector: Injector;

  constructor(
    private readonly _injector: Injector,
    private readonly cardEventsFacadeService: CardEventsFacadeService,
    private readonly bbFacadeService: DbFacadeService,
  ) {
    this.injector = this._injector;
  }

  ngOnInit(): void {
    this.cardEventsFacadeService.startDomain();
  }

  listDropped(event: CdkDragDrop<IBlock[]>) {
    moveItemInArray(
      this.blocks$$.value,
      event.previousIndex,
      event.currentIndex,
    );
    this.cardEventsFacadeService.onEvent(false);
  }

  onMove() {
    this.cardEventsFacadeService.onEvent(true);
  }
}
