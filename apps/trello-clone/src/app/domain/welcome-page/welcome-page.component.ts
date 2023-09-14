import { DragDropModule } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
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
  constructor(readonly dragAndDropService: DragAndDropService) { }


}
