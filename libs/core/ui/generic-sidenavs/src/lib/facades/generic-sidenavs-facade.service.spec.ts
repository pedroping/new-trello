/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GenericSidenavsFacadeService } from './generic-sidenavs-facade.service';

describe('Service: GenericSidenavsFacade', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GenericSidenavsFacadeService],
    });
  });

  it('should ...', inject(
    [GenericSidenavsFacadeService],
    (service: GenericSidenavsFacadeService) => {
      expect(service).toBeTruthy();
    },
  ));
});
