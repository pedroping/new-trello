import { Component, input } from '@angular/core';
import { HideSidenavsDirective } from '../../directives/hide-sidenavs.directive';
import { GenericSidenavsFacadeService } from '../../facades/generic-sidenavs-facade.service';

@Component({
  selector: 'generic-sidenav',
  templateUrl: './generic-sidenav.component.html',
  styleUrls: ['./generic-sidenav.component.scss'],
  standalone: true,
  imports: [HideSidenavsDirective],
})
export class GenericSidenavComponent {
  side = input.required<'right' | 'left'>();

  constructor(
    private readonly genericSidenavsFacadeService: GenericSidenavsFacadeService,
  ) {}

  get sideNavObservable$$() {
    return this.side() == 'right'
      ? this.genericSidenavsFacadeService.rightSideNav$$
      : this.genericSidenavsFacadeService.leftSideNav$$;
  }

  get initialState() {
    return this.side() == 'right'
      ? this.genericSidenavsFacadeService.rightSideNavState
      : this.genericSidenavsFacadeService.leftSideNavState;
  }
}
