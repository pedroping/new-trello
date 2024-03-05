/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OnlineOfflineStateService } from './online-offline-state.service';

describe('Service: OnlineOfflineState', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OnlineOfflineStateService],
    });
  });

  it('should ...', inject(
    [OnlineOfflineStateService],
    (service: OnlineOfflineStateService) => {
      expect(service).toBeTruthy();
    },
  ));
});
