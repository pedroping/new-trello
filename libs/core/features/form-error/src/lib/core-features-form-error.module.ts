import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormErrorDirective } from './directives/form-error.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [FormErrorDirective],
  exports: [FormErrorDirective],
})
export class CoreFeaturesFormErrorModule {}
