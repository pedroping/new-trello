import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutsideAddBlockClickDirective } from './directives/outside-add-block-click/outside-add-block-click.directive';
import { PreventClickDirective } from './directives/prevent-click/prevent-click.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [OutsideAddBlockClickDirective, PreventClickDirective],
  exports: [OutsideAddBlockClickDirective, PreventClickDirective],
})
export class CoreFeaturesOutsideElementClickModule {}
