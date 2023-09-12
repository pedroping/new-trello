import { DragDropModule } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreUiToolbarModule } from '@my-monorepo/core/ui/toolbar';
import { ToolbarContentComponent } from '../../core/toolbar-content/toolbar-content.component';
import { CoreFeaturesCustomBackgroundModule } from '@my-monorepo/core/features/custom-background';
import { CoreFeaturesDragScrollModule } from '@my-monorepo/core/features/drag-scroll';
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
export class WelcomePageComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
