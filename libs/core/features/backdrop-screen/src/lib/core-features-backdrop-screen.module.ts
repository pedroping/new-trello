import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackdropScreenComponent } from './components/backdrop-screen/backdrop-screen.component';

@NgModule({
  imports: [CommonModule],
  declarations: [BackdropScreenComponent],
  exports: [BackdropScreenComponent],
})
export class CoreFeaturesBackdropScreenModule {}
