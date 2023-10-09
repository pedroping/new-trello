import { CdkDrag, CdkDropList, DragDropModule } from '@angular/cdk/drag-drop';
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
    RouterLink
  ],
})
@ClearMocks()
export class HomePageComponent {
  blocks$ = this.cardMocksService.blocks$;
  injector: Injector;

  onDrop = this.dragAndDropService.onDrop.bind(this.dragAndDropService)
  drop = this.dragAndDropService.blockDrop.bind(this.dragAndDropService)
  onMove = this.dragAndDropService.onMove.bind(this.dragAndDropService)


  constructor(
    readonly dragAndDropService: DragAndDropService,
    readonly cdr: ChangeDetectorRef,
    readonly cardMocksService: CardMocksService,
    private readonly _injector: Injector
  ) {
    this.injector = this._injector;
    this.cardMocksService.getAllCards()
  }
}
