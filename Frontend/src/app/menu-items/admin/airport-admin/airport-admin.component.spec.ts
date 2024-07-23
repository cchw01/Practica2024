import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirportAdminComponent } from './airport-admin.component';

describe('AirportAdminComponent', () => {
  let component: AirportAdminComponent;
  let fixture: ComponentFixture<AirportAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AirportAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AirportAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
