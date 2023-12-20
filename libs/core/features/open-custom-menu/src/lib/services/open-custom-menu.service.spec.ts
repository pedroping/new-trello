/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OpenCustomMenuService } from './open-custom-menu.service';

describe('Service: OpenCustomMenu', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OpenCustomMenuService]
    });
  });

  it('should ...', inject([OpenCustomMenuService], (service: OpenCustomMenuService) => {
    expect(service).toBeTruthy();
  }));
});
