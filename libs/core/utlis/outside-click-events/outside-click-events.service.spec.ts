/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OutsideClickEventsService } from './outside-click-events.service';

describe('Service: OutsideClickEvents', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OutsideClickEventsService],
    });
  });

  it('should ...', inject(
    [OutsideClickEventsService],
    (service: OutsideClickEventsService) => {
      expect(service).toBeTruthy();
    },
  ));
});
