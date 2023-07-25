import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelloWorldComponent } from './components/helloWorld/helloWorld.component';

@NgModule({
  imports: [CommonModule],
  declarations: [HelloWorldComponent],
  exports: [HelloWorldComponent],
})
export class UiModule {}
