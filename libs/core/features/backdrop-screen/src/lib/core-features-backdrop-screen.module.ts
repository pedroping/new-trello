import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackdropScreenComponent } from './components/backdrop-screen/backdrop-screen.component';
import { OutsideAddBlockClickDirective } from '@my-monorepo/core/features/outside-element-click';
import { BackdropContentDirective } from './directive/backdrop-content.directive';

@NgModule({
  imports: [CommonModule, OutsideAddBlockClickDirective],
  declarations: [BackdropScreenComponent, BackdropContentDirective],
  exports: [BackdropScreenComponent, BackdropContentDirective],
})
export class CoreFeaturesBackdropScreenModule {}
