import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import {
  CoreFeaturesTrelloToolsModule,
  DragAndDropService,
} from '@my-monorepo/core/features/trello-tools';
import { CoreUiSidenavModule } from '@my-monorepo/core/ui/sidenav';
import { CoreUiToolbarModule } from '@my-monorepo/core/ui/toolbar';
import { CoreFeaturesDragScrollModule } from '@my-monorepo/core/features/drag-scroll';
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
  ],
})
export class HomePageComponent {
  blocks = Array.from({ length: 5 }, (_, i) => i + 1);

  constructor(
    readonly dragAndDropService: DragAndDropService,
    readonly cdr: ChangeDetectorRef
  ) {}

  drop(event: CdkDragDrop<number[]>) {
    moveItemInArray(this.blocks, event.previousIndex, event.currentIndex);
  }

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
