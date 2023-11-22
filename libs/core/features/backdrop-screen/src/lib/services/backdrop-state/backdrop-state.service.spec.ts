/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BackdropStateService } from './backdrop-state.service';

describe('Service: BackdropState', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BackdropStateService]
    });
  });

  it('should ...', inject([BackdropStateService], (service: BackdropStateService) => {
    expect(service).toBeTruthy();
  }));
});
