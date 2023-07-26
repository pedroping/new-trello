/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ToolbarService } from './toolbar.service';

describe('Service: Toolbar', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToolbarService]
    });
  });

  it('should ...', inject([ToolbarService], (service: ToolbarService) => {
    expect(service).toBeTruthy();
  }));
});
