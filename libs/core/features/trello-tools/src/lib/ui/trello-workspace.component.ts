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
import { CallSetValueChanges } from '@my-monorepo/core/features/set-value-changes-decorator';
import { DbFacadeService } from '@my-monorepo/core/features/trello-db';
import { IBlock } from '@my-monorepo/core/utlis';
import { fromEvent, startWith } from 'rxjs';
import { AddNewBlockComponent } from '../components/add-new-block/add-new-block.component';
import { CardBlockComponent } from '../components/card-block/card-block.component';
import { CursorDraggingDirective } from '../directives/cursor-dragging/cursor-dragging.directive';
import { CardEventsFacadeService } from '../facades/card-events-facade.service';
import {
  DRAG_DELAY_BREAKPOINT,
  TIME_TO_DRAG_START,
} from '../models/card.models';

@Component({
  selector: 'trello-workspace',
  templateUrl: './trello-workspace.component.html',
  styleUrls: ['./trello-workspace.component.scss'],
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
@CallSetValueChanges()
export class TrelloWorkspaceComponent implements OnInit {
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

  setValueChanges() {
    fromEvent(window, 'resize')
      .pipe(startWith(window.innerWidth))
      .subscribe(() => {
        this.timeToDragStart =
          window.innerWidth <= DRAG_DELAY_BREAKPOINT ? TIME_TO_DRAG_START : 0;
      });
  }
}
