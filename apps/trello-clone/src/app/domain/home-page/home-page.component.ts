import {
  CdkDrag,
  CdkDropList,
  DragDropModule
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { CoreFeaturesDragScrollModule } from '@my-monorepo/core/features/drag-scroll';
import {
  CardMocksService,
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
  ],
})
export class HomePageComponent {

  blocks$ = this.cardMocksService.blocks$
  
  constructor(
    readonly dragAndDropService: DragAndDropService,
    readonly cdr: ChangeDetectorRef,
    readonly cardMocksService: CardMocksService
  ) {}

  onMove() {
    this.dragAndDropService.onBlockMove = true;
    if (this.dragAndDropService.onMove$.value) return;
    this.dragAndDropService.onMove$.next(true);
    this.cdr.detectChanges();
  }

  onDrop() {
    this.dragAndDropService.onBlockMove = false;
    if (!this.dragAndDropService.onMove$.value) return;
    this.dragAndDropService.onMove$.next(false);
    this.cdr.detectChanges();
  }
}
