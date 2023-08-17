import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CoreFeaturesDynamicFormsModule } from "@my-monorepo/core/features/dynamic-forms";
import { TuiTagModule } from '@taiga-ui/kit';
import { TableComponent } from './components/table/table.component';
import { GenerateCustomFieldDirective } from './directives/generate-custom-field.directive';

@NgModule({
  imports: [CommonModule, TuiTagModule, CdkTableModule, CoreFeaturesDynamicFormsModule, MatPaginatorModule],
  declarations: [TableComponent, GenerateCustomFieldDirective],
  exports: [TableComponent, GenerateCustomFieldDirective],
  providers: [GenerateCustomFieldDirective]
})

export class CoreUiDynamicTableModule { }
