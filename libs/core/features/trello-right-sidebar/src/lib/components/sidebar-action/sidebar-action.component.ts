import { Component, HostListener, output } from '@angular/core';
import { DisableButtonOnDragDirective } from '@my-monorepo/core/features/trello-tools';

@Component({
  selector: 'trello-sidebar-action',
  templateUrl: './sidebar-action.component.html',
  styleUrls: ['./sidebar-action.component.scss'],
  standalone: true,
  hostDirectives: [DisableButtonOnDragDirective],
})
export class SidebarActionComponent {
  clickEvent = output<void>();

  @HostListener('click')
  onCLick() {
    this.clickEvent.emit();
  }
}
