import { TestBed, inject } from '@angular/core/testing';
import { MemoryLocationStrategy } from './memory-location.service';

describe('Service: MemoryLocation', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MemoryLocationStrategy],
    });
  });

  it('should ...', inject(
    [MemoryLocationStrategy],
    (service: MemoryLocationStrategy) => {
      expect(service).toBeTruthy();
    },
  ));
});
