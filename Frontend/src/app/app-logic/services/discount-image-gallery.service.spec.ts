import { TestBed } from '@angular/core/testing';

import { DiscountImageGalleryService } from './discount-image-gallery.service';

describe('DiscountImageGalleryService', () => {
  let service: DiscountImageGalleryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiscountImageGalleryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
