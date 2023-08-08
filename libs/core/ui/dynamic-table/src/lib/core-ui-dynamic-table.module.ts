import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TuiTagModule } from '@taiga-ui/kit';
import { TableComponent } from './components/table/table.component';

@NgModule({
  imports: [CommonModule, TuiTagModule, CdkTableModule],
  declarations: [TableComponent],
  exports: [TableComponent],
})

export class CoreUiDynamicTableModule { }
