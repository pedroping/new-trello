/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CardDbService } from './card-db.service';

describe('Service: CardDb', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CardDbService]
    });
  });

  it('should ...', inject([CardDbService], (service: CardDbService) => {
    expect(service).toBeTruthy();
  }));
});
