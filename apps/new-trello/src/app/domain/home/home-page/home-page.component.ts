import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  DragDropModule,
} from '@angular/cdk/drag-drop';
import { AsyncPipe } from '@angular/common';

import { Component, Injector, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  DragScrollDirective,
  PageWidthDirective,
} from '@my-monorepo/core/features/drag-scroll';
import {
  AddNewBlockComponent,
  CardBlockComponent,
  CardEventsFacadeService,
  ClearMocks,
  CursorDraggingDirective,
  IBlock,
  IndexedDbService,
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
  blocks$$ = this.cardEventsFacadeService.blocks$$;
  injector: Injector;

  constructor(
    private readonly _injector: Injector,
    private readonly cardEventsFacadeService: CardEventsFacadeService,
    private readonly indexedDbService: IndexedDbService,
  ) {
    this.injector = this._injector;
  }

  ngOnInit(): void {
    this.cardEventsFacadeService.startDomain();
  }

  listDropped(event: CdkDragDrop<IBlock[]>) {
    this.cardEventsFacadeService.blockDrop(event);
    this.cardEventsFacadeService.onEvent(false);
  }

  onMove() {
    this.cardEventsFacadeService.onEvent(true);
  }

  addNew() {
    this.indexedDbService.addNewElement();
  }
}
