import { TestBed } from '@angular/core/testing';
import { ContactProviderService } from './contact-provider.component';

describe('ContactProviderService', () => {
  let service: ContactProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
