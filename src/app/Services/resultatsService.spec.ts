import { TestBed, inject } from '@angular/core/testing';

import { ResultatsService } from './resultatsService';

describe('ResultatsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResultatsService]
    });
  });

  it('should be created', inject([ResultatsService], (service: ResultatsService) => {
    expect(service).toBeTruthy();
  }));
});
