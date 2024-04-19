/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WallpapersDbService } from './wallpapers-db.service';

describe('Service: WallpapersDb', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WallpapersDbService],
    });
  });

  it('should ...', inject(
    [WallpapersDbService],
    (service: WallpapersDbService) => {
      expect(service).toBeTruthy();
    },
  ));
});
