import { Component } from '@angular/core';
import { SidebarContentDirective } from '../../directives/sidebar-content/sidebar-content.directive';
import { RightSidebarHeaderComponent } from '../right-sidebar-header/right-sidebar-header.component';

@Component({
  selector: 'uf-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.scss'],
  standalone: true,
  imports: [RightSidebarHeaderComponent, SidebarContentDirective],
})
export class RightSidebarComponent {}
