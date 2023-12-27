import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericSidenavComponent } from './components/generic-sidenav/generic-sidenav.component';

@NgModule({
  imports: [CommonModule],
  declarations: [GenericSidenavComponent],
  exports: [GenericSidenavComponent],
})
export class CoreUiGenericSidenavsModule {}
