import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SelectedRouteDirective } from './directives/selected-route.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [SelectedRouteDirective],
  exports: [SelectedRouteDirective],
})
export class CoreFeaturesSelectedRouteModule {}
