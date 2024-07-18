import { TestBed } from '@angular/core/testing';

import { DiscountListMockService } from './discount-list-mock.service';
describe('DiscountListMockService', () => {
  let service: DiscountListMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiscountListMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
