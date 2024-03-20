/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DragElementsService } from './drag-elements.service';

describe('Service: DragElements', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DragElementsService]
    });
  });

  it('should ...', inject([DragElementsService], (service: DragElementsService) => {
    expect(service).toBeTruthy();
  }));
});
