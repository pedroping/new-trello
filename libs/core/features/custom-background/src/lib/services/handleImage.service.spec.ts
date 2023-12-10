/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HandleImageService } from './handleImage.service';

describe('Service: HandleImage', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HandleImageService],
    });
  });

  it('should ...', inject(
    [HandleImageService],
    (service: HandleImageService) => {
      expect(service).toBeTruthy();
    }
  ));
});
