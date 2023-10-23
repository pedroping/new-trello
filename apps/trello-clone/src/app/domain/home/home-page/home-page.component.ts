import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  DragDropModule,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Injector } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CoreFeaturesDragScrollModule } from '@my-monorepo/core/features/drag-scroll';
import {
  CardMocksService,
  ClearMocks,
  CoreFeaturesTrelloToolsModule,
  DragAndDropService,
} from '@my-monorepo/core/features/trello-tools';
import { CoreUiSidenavModule } from '@my-monorepo/core/ui/sidenav';
import { CoreUiToolbarModule } from '@my-monorepo/core/ui/toolbar';
import { IBlock } from 'libs/core/features/trello-tools/src/lib/models/card.models';
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
})
@ClearMocks()
export class HomePageComponent {
  blocks$ = this.cardMocksService.blocks$;
  injector: Injector;

  creatEvent$!: Observable<void>;
  deleteEvent$!: Observable<void>;

  constructor(
    readonly dragAndDropService: DragAndDropService,
    readonly cardMocksService: CardMocksService,
    private readonly cdr: ChangeDetectorRef,
    private readonly _injector: Injector
  ) {
    this.injector = this._injector;
    this.cardMocksService.getAllCards();
  }

  listDropped(event: CdkDragDrop<IBlock[]>) {
    this.dragAndDropService.blockDrop(event);
    this.dragAndDropService.onDrop(this.cdr);
  }

  onMove() {
    this.dragAndDropService.onMove(this.cdr);
  }
}
