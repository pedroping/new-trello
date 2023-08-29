import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CoreFeaturesDynamicFormsModule } from "@my-monorepo/core/features/dynamic-forms";
import { TuiTagModule } from '@taiga-ui/kit';
import { NgxPaginationModule } from 'ngx-pagination';
import { TableComponent } from './components/table/table.component';
import { GenerateCustomFieldDirective } from './directives/generate-custom-field.directive';
import { CoreFeaturesExpandTableModule } from '@my-monorepo/core/features/expand-table';
@NgModule({
  imports: [CommonModule, TuiTagModule, CdkTableModule, CoreFeaturesDynamicFormsModule, MatPaginatorModule, NgxPaginationModule, CoreFeaturesExpandTableModule],
  declarations: [TableComponent, GenerateCustomFieldDirective],
  exports: [TableComponent, GenerateCustomFieldDirective],
  providers: [GenerateCustomFieldDirective]
})

export class CoreUiDynamicTableModule { }
