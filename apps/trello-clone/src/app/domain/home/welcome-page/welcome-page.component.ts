import {
  DragDropModule
} from '@angular/cdk/drag-drop';
import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreFeaturesDragScrollModule } from '@my-monorepo/core/features/drag-scroll';
import { CoreUiToolbarModule } from '@my-monorepo/core/ui/toolbar';
import { ToolbarContentComponent } from '../../../core/toolbar-content/toolbar-content.component';
import { testToken } from '../../../app.config';
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
    CoreFeaturesDragScrollModule,
  ],
})
export class WelcomePageComponent implements OnInit {
  private a = inject(testToken)

  ngOnInit() {
    console.log('a', this.a);

  }
}
