import { Component, HostListener, output } from '@angular/core';

@Component({
  selector: 'trello-sidebar-action',
  templateUrl: './sidebar-action.component.html',
  styleUrls: ['./sidebar-action.component.scss'],
  standalone: true,
})
export class SidebarActionComponent {
  clickEvent = output<void>();

  @HostListener('click')
  onCLick() {
    this.clickEvent.emit();
  }
}
