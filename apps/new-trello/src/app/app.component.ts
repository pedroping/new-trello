import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreFeaturesBackdropScreenModule } from '@my-monorepo/core/features/backdrop-screen';
import { CustomBackgroundDirective } from '@my-monorepo/core/features/custom-background';
import { CoreUiToolbarModule } from '@my-monorepo/core/ui/toolbar';

@Component({
  selector: 'my-monorepo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    CoreUiToolbarModule,
    CoreFeaturesBackdropScreenModule,
    CustomBackgroundDirective,
  ],
})
export class AppComponent {}
