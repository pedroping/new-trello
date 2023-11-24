import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackdropScreenComponent } from './components/backdrop-screen/backdrop-screen.component';
import { CoreFeaturesOutsideElementClickModule } from '@my-monorepo/core/features/outside-element-click';

@NgModule({
  imports: [CommonModule, CoreFeaturesOutsideElementClickModule],
  declarations: [BackdropScreenComponent],
  exports: [BackdropScreenComponent],
})
export class CoreFeaturesBackdropScreenModule {}
