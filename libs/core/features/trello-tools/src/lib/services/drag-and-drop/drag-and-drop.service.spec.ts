/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DragAndDropService } from './drag-and-drop.service';

describe('Service: DragAndDrop', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DragAndDropService]
    });
  });

  it('should ...', inject([DragAndDropService], (service: DragAndDropService) => {
    expect(service).toBeTruthy();
  }));
});
