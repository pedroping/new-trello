/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ScrollEventsService } from './scroll-events.service';

describe('Service: ScrollEvents', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScrollEventsService]
    });
  });

  it('should ...', inject([ScrollEventsService], (service: ScrollEventsService) => {
    expect(service).toBeTruthy();
  }));
});
