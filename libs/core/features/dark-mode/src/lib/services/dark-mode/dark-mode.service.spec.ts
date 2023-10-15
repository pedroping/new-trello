/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { DarkModeService } from './dark-mode.service';

describe('Service: DarkMode', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DarkModeService],
    });
  });

  it('should ...', inject([DarkModeService], (service: DarkModeService) => {
    expect(service).toBeTruthy();
  }));
});
