import { TestBed } from '@angular/core/testing';

import { FlightMockService } from './flight-mock.service';

describe('FlightMockService', () => {
  let service: FlightMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlightMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
