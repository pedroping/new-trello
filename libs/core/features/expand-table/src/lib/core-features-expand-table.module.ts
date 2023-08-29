import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpandTableDirective } from './directive/expand-table.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [ExpandTableDirective],
  exports: [ExpandTableDirective]
})
export class CoreFeaturesExpandTableModule { }
