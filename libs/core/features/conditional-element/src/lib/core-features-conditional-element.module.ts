import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObsavableBasedElementDirective } from './directives/obsavable-based-element.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [ObsavableBasedElementDirective],
  exports: [ObsavableBasedElementDirective],
})
export class CoreFeaturesConditionalElementModule {}
