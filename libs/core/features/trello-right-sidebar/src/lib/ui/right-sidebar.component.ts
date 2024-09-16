import { Component } from '@angular/core';
import { RightSidebarHeaderComponent } from '../components/right-sidebar-header/right-sidebar-header.component';
import { SidebarContentDirective } from '../directives/sidebar-content/sidebar-content.directive';

@Component({
  selector: 'uf-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.scss'],
  standalone: true,
  imports: [RightSidebarHeaderComponent, SidebarContentDirective],
})
export class RightSidebarComponent {}
