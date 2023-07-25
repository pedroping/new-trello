import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelloWordComponent } from './components/hello-word/hello-word.component';
import { TuiTagModule } from '@taiga-ui/kit';
@NgModule({
  imports: [CommonModule, TuiTagModule],
  declarations: [HelloWordComponent],
  exports: [HelloWordComponent],
})

export class CoreUiDynamicTableModule {}
