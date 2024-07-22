import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckInAdminComponent } from './check-in-admin.component';

describe('CheckInAdminComponent', () => {
  let component: CheckInAdminComponent;
  let fixture: ComponentFixture<CheckInAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckInAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckInAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
