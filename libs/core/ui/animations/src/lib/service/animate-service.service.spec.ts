/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AnimateServiceService } from './animate-service.service';

describe('Service: AnimateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnimateServiceService],
    });
  });

  it('should ...', inject(
    [AnimateServiceService],
    (service: AnimateServiceService) => {
      expect(service).toBeTruthy();
    },
  ));
});
