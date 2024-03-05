import { Injectable } from '@angular/core';
import { GenericSidenavsStateService } from '../services/generic-sidenavs-state/generic-sidenavs-state.service';

@Injectable({ providedIn: 'root' })
export class GenericSidenavsFacadeService {
  constructor(
    private readonly genericSidenavsStateService: GenericSidenavsStateService,
  ) {}

  startDomain(element: HTMLElement) {
    this.genericSidenavsStateService.toggleClass(element);
  }

  setRightSideNavState(value: boolean) {
    this.genericSidenavsStateService.rightSidenav$.next(value);
  }

  setLeftSideNavState(value: boolean) {
    this.genericSidenavsStateService.leftSidenav$.next(value);
  }

  get rightSideNavState() {
    return this.genericSidenavsStateService.rightSidenav$.value;
  }

  get leftSideNavState() {
    return this.genericSidenavsStateService.leftSidenav$.value;
  }

  get rightSideNav$$() {
    return this.genericSidenavsStateService.rightSidenav$.asObservable();
  }

  get leftSideNav$$() {
    return this.genericSidenavsStateService.leftSidenav$.asObservable();
  }
}
