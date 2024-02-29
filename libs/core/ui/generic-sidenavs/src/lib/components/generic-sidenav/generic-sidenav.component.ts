import { Component, Input } from '@angular/core';
import { GenericSidenavsFacadeService } from '../../facades/generic-sidenavs-facade.service';
import { HideSidenavsDirective } from '../../directives/hide-sidenavs.directive';

@Component({
  selector: 'generic-sidenav',
  templateUrl: './generic-sidenav.component.html',
  styleUrls: ['./generic-sidenav.component.scss'],
  standalone: true,
  imports: [HideSidenavsDirective],
})
export class GenericSidenavComponent {
  @Input({ required: true }) side!: 'right' | 'left';

  constructor(
    private readonly genericSidenavsFacadeService: GenericSidenavsFacadeService
  ) {}

  get sideNavObservable$$() {
    return this.side == 'right'
      ? this.genericSidenavsFacadeService.rightSideNav$$
      : this.genericSidenavsFacadeService.leftSideNav$$;
  }

  get initialState() {
    return this.side == 'right'
      ? this.genericSidenavsFacadeService.rightSideNavState
      : this.genericSidenavsFacadeService.leftSideNavState;
  }
}
