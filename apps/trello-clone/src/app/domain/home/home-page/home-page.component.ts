import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  DragDropModule,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Injector, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CoreFeaturesDragScrollModule } from '@my-monorepo/core/features/drag-scroll';
import {
  CardMocksService,
  ClearMocks,
  CoreFeaturesTrelloToolsModule,
  CursorDraggingDirective,
  DragAndDropService,
  IBlock,
} from '@my-monorepo/core/features/trello-tools';
import { CoreUiSidenavModule } from '@my-monorepo/core/ui/sidenav';
import { CoreUiToolbarModule } from '@my-monorepo/core/ui/toolbar';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    CoreFeaturesTrelloToolsModule,
    DragDropModule,
    CoreUiSidenavModule,
    CoreUiToolbarModule,
    CoreFeaturesDragScrollModule,
    CdkDropList,
    CdkDrag,
    RouterLink,
  ],
  hostDirectives: [CursorDraggingDirective],
})
@ClearMocks()
export class HomePageComponent implements OnInit {
  blocks$ = this.cardMocksService.blocks$;
  injector: Injector;

  creatEvent$!: Observable<void>;
  deleteEvent$!: Observable<void>;

  constructor(
    private readonly dragAndDropService: DragAndDropService,
    private readonly cardMocksService: CardMocksService,
    private readonly cdr: ChangeDetectorRef,
    private readonly _injector: Injector
  ) {
    this.injector = this._injector;
  }

  ngOnInit(): void {
    this.dragAndDropService.startDomain();
  }

  listDropped(event: CdkDragDrop<IBlock[]>) {
    this.dragAndDropService.blockDrop(event);
    this.dragAndDropService.onDrop(this.cdr);
  }

  onMove() {
    this.dragAndDropService.onMove(this.cdr);
  }
}
