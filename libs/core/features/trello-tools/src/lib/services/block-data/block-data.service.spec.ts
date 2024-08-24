/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BlockDataService } from './block-data.service';

describe('Service: BlockData', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BlockDataService]
    });
  });

  it('should ...', inject([BlockDataService], (service: BlockDataService) => {
    expect(service).toBeTruthy();
  }));
});
