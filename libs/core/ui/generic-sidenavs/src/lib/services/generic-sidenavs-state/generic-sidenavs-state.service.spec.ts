/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GenericSidenavsStateService } from './generic-sidenavs-state.service';

describe('Service: GenericSidenavsState', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GenericSidenavsStateService],
    });
  });

  it('should ...', inject(
    [GenericSidenavsStateService],
    (service: GenericSidenavsStateService) => {
      expect(service).toBeTruthy();
    }
  ));
});
