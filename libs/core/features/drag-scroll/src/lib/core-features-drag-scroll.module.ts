import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragScrollDirective } from './directives/drag-scroll.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [DragScrollDirective],
  exports: [DragScrollDirective],
})
export class CoreFeaturesDragScrollModule {}
