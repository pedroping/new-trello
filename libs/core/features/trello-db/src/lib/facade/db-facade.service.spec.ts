/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DbFacadeService } from './db-facade.service';

describe('Service: DbFacade', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DbFacadeService],
    });
  });

  it('should ...', inject([DbFacadeService], (service: DbFacadeService) => {
    expect(service).toBeTruthy();
  }));
});
