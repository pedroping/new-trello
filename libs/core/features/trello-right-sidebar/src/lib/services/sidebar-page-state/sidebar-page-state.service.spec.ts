/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SidebarPageStateService } from './sidebar-page-state.service';

describe('Service: SidebarPageState', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SidebarPageStateService]
    });
  });

  it('should ...', inject([SidebarPageStateService], (service: SidebarPageStateService) => {
    expect(service).toBeTruthy();
  }));
});
