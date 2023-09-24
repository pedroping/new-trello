/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CardMocksService } from './card-mocks.service';

describe('Service: CardMocks', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CardMocksService]
    });
  });

  it('should ...', inject([CardMocksService], (service: CardMocksService) => {
    expect(service).toBeTruthy();
  }));
});
