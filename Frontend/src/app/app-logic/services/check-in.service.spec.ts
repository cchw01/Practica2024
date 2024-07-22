import { TestBed } from '@angular/core/testing';

import { CheckInService } from './check-in.service';

describe('ChekcInService', () => {
  let service: CheckInService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckInService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
