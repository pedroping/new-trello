/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TableActions } from './table-actions.service';

describe('Service: TableActions', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TableActions],
    });
  });

  it('should ...', inject([TableActions], (service: TableActions) => {
    expect(service).toBeTruthy();
  }));
});
