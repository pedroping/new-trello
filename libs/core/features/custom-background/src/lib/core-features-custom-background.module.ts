import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SetBackgroundMenuComponent } from './components/set-background-menu/set-background-menu.component';
import { CustomBackgroundDirective } from './directives/custom-background.directive';

@NgModule({
  imports: [CommonModule, MatIconModule],
  declarations: [CustomBackgroundDirective, SetBackgroundMenuComponent],
  exports: [CustomBackgroundDirective, SetBackgroundMenuComponent],
})
export class CoreFeaturesCustomBackgroundModule {}
