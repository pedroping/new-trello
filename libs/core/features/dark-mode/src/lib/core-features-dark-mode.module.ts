import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenerateIconDirective } from './directives/generate-icon/generate-icon.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [GenerateIconDirective],
  exports: [GenerateIconDirective],
})
export class CoreFeaturesDarkModeModule {}
