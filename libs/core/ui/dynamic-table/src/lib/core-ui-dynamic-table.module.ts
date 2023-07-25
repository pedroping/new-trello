import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelloWordComponent } from './components/hello-word/hello-word.component';

@NgModule({
  imports: [CommonModule],
  declarations: [HelloWordComponent],
  exports: [HelloWordComponent],
})
export class CoreUiDynamicTableModule {}
