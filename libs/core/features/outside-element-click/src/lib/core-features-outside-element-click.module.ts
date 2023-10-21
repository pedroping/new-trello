import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutsideAddBlockClickDirective } from './directives/outside-add-block-click.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [OutsideAddBlockClickDirective],
  exports: [OutsideAddBlockClickDirective],
})
export class CoreFeaturesOutsideElementClickModule {}
