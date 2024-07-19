import { TestBed } from '@angular/core/testing';

import { BookingListMockService } from './booking-list-mock.service';

describe('BookingListMockService', () => {
  let service: BookingListMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingListMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
