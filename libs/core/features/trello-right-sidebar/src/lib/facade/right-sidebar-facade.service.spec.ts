/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RightSidebarFacadeService } from './right-sidebar-facade.service';

describe('Service: RightSidebarFacade', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RightSidebarFacadeService]
    });
  });

  it('should ...', inject([RightSidebarFacadeService], (service: RightSidebarFacadeService) => {
    expect(service).toBeTruthy();
  }));
});
