import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreFeaturesCustomBackgroundModule } from '@my-monorepo/core/features/custom-background';
import { CoreFeaturesDragScrollModule } from '@my-monorepo/core/features/drag-scroll';
import {
  CardMocksService,
  DragAndDropService,
} from '@my-monorepo/core/features/trello-tools';
import { CoreUiToolbarModule } from '@my-monorepo/core/ui/toolbar';
import { ToolbarContentComponent } from '../../core/toolbar-content/toolbar-content.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    DragDropModule,
    RouterModule,
    CoreUiToolbarModule,
    ToolbarContentComponent,
    CoreFeaturesCustomBackgroundModule,
    CoreFeaturesDragScrollModule,
  ],
})
export class WelcomePageComponent implements OnInit {
  blocks$ = this.cardMocksService.blocks$;

  constructor(
    readonly dragAndDropService: DragAndDropService,
    readonly cdr: ChangeDetectorRef,
    private cardMocksService: CardMocksService
  ) {}

  ngOnInit(): void {
    this.blocks$.subscribe(() => this.cdr.detectChanges());
    this.cardMocksService.getAllCards();
  }

  drop(
    event: CdkDragDrop<
      {
        name: string;
        cards: number[];
      }[]
    >
  ) {
    moveItemInArray(
      this.cardMocksService.blocks$.value,
      event.previousIndex,
      event.currentIndex
    );
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
