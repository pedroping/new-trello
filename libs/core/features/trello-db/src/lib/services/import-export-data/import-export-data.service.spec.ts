/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ImportExportDataService } from './import-export-data.service';

describe('Service: ImportExportData', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImportExportDataService]
    });
  });

  it('should ...', inject([ImportExportDataService], (service: ImportExportDataService) => {
    expect(service).toBeTruthy();
  }));
});
