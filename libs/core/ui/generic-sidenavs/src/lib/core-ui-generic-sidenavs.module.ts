import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericSidenavComponent } from './components/generic-sidenav/generic-sidenav.component';
import { HideSidenavsDirective } from './directives/hide-sidenavs.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [GenericSidenavComponent, HideSidenavsDirective],
  exports: [GenericSidenavComponent],
})
export class CoreUiGenericSidenavsModule {}
