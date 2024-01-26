import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragScrollDirective } from './directives/drag-scroll/drag-scroll.directive';
import { PageWidthDirective } from './directives/page-width/page-width.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [DragScrollDirective, PageWidthDirective],
  exports: [DragScrollDirective, PageWidthDirective],
})
export class CoreFeaturesDragScrollModule {}
