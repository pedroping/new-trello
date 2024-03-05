/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CardBlockDbService } from './card-block-db.service';

describe('Service: CardBlockDb', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CardBlockDbService]
    });
  });

  it('should ...', inject([CardBlockDbService], (service: CardBlockDbService) => {
    expect(service).toBeTruthy();
  }));
});
