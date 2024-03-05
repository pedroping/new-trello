/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CardEventsFacadeService } from './card-events-facade.service';

describe('Service: CardEventsFacade', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CardEventsFacadeService],
    });
  });

  it('should ...', inject(
    [CardEventsFacadeService],
    (service: CardEventsFacadeService) => {
      expect(service).toBeTruthy();
    },
  ));
});
