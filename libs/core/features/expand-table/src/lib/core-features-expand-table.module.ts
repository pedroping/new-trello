import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpandTableDirective } from './directive/expand-table/expand-table.directive';
import { HasElementDirective } from './directive/hasElement/has-element.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [ExpandTableDirective, HasElementDirective],
  exports: [ExpandTableDirective, HasElementDirective],
})
export class CoreFeaturesExpandTableModule {}
