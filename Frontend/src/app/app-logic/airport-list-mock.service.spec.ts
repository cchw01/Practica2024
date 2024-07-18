import { TestBed } from '@angular/core/testing';

import { AirportListMockService } from './airport-list-mock.service';

describe('AirportListMockService', () => {
  let service: AirportListMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AirportListMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
