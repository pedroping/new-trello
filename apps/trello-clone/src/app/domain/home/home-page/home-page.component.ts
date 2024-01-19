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
  CardEventsFacadeService,
  ClearMocks,
  CoreFeaturesTrelloToolsModule,
  CursorDraggingDirective,
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
  blocks$$ = this.cardEventsFacadeService.blocks$$;
  injector: Injector;

  constructor(
    private readonly _injector: Injector,
    private readonly cardEventsFacadeService: CardEventsFacadeService
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
}
