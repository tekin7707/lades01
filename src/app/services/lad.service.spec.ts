import { TestBed, inject } from '@angular/core/testing';

import { LadService } from './lad.service';

describe('LadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LadService]
    });
  });

  it('should be created', inject([LadService], (service: LadService) => {
    expect(service).toBeTruthy();
  }));
});
