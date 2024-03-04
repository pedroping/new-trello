/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DefaultTableService } from './default-table.service';

describe('Service: DefaultTable', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DefaultTableService]
    });
  });

  it('should ...', inject([DefaultTableService], (service: DefaultTableService) => {
    expect(service).toBeTruthy();
  }));
});
