import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackdropScreenComponent } from './components/backdrop-screen/backdrop-screen.component';
import { CoreFeaturesOutsideElementClickModule } from '@my-monorepo/core/features/outside-element-click';
import { BackdropContentDirective } from './directives/backdrop-content/backdrop-content.directive';

@NgModule({
  imports: [CommonModule, CoreFeaturesOutsideElementClickModule],
  declarations: [BackdropScreenComponent, BackdropContentDirective],
  exports: [BackdropScreenComponent, BackdropContentDirective],
})
export class CoreFeaturesBackdropScreenModule {}
