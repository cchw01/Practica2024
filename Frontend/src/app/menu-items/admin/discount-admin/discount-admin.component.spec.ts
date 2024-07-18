import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountAdminComponent } from './discount-admin.component';

describe('DiscountAdminComponent', () => {
  let component: DiscountAdminComponent;
  let fixture: ComponentFixture<DiscountAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DiscountAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscountAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
