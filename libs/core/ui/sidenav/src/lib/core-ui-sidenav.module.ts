import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavComponent } from './sidenav/sidenav.component';

@NgModule({
  imports: [CommonModule, MatSidenavModule],
  declarations: [SidenavComponent],
  exports: [SidenavComponent],
})
export class CoreUiSidenavModule {}
