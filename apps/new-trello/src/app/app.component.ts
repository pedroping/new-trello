import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreFeaturesBackdropScreenModule } from '@my-monorepo/core/features/backdrop-screen';
import { CoreFeaturesCustomBackgroundModule } from '@my-monorepo/core/features/custom-background';
import { CoreFeaturesDragScrollModule } from '@my-monorepo/core/features/drag-scroll';
import { CoreUiToolbarModule } from '@my-monorepo/core/ui/toolbar';

@Component({
  selector: 'my-monorepo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    CoreUiToolbarModule,
    CoreFeaturesDragScrollModule,
    CoreFeaturesBackdropScreenModule,
    CoreFeaturesCustomBackgroundModule,
  ],
})
export class AppComponent {}
