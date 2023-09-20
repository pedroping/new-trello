import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreFeaturesCustomBackgroundModule } from '@my-monorepo/core/features/custom-background';
import { CoreFeaturesDragScrollModule } from '@my-monorepo/core/features/drag-scroll';
import { DragAndDropService } from '@my-monorepo/core/features/trello-tools';
import { CoreUiToolbarModule } from '@my-monorepo/core/ui/toolbar';
import { ToolbarContentComponent } from '../../core/toolbar-content/toolbar-content.component';
@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
  standalone: true,
  imports: [
    DragDropModule,
    RouterModule,
    CoreUiToolbarModule,
    ToolbarContentComponent,
    CoreFeaturesCustomBackgroundModule,
    CoreFeaturesDragScrollModule,
  ],
})
export class WelcomePageComponent {
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
