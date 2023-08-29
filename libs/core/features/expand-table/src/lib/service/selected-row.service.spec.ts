/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SelectedRowService } from './selected-row.service';

describe('Service: SelectedRow', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SelectedRowService]
    });
  });

  it('should ...', inject([SelectedRowService], (service: SelectedRowService) => {
    expect(service).toBeTruthy();
  }));
});
