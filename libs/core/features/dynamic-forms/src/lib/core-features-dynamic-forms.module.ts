import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { DynamicFormsComponent } from './generators/dynamic-forms/dynamic-forms.component';
import { GenerateDirective } from './generators/generate-directive/generate-directive.directive';
@NgModule({
  imports: [CommonModule, MatInputModule, FormsModule, ReactiveFormsModule],
  declarations: [DynamicFormsComponent, GenerateDirective],
  exports: [DynamicFormsComponent, GenerateDirective],
  providers: [],
})
export class CoreFeaturesDynamicFormsModule {}
