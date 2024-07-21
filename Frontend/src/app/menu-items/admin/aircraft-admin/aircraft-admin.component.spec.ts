import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AircraftAdminComponent } from './aircraft-admin.component';

describe('AircraftAdminComponent', () => {
  let component: AircraftAdminComponent;
  let fixture: ComponentFixture<AircraftAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AircraftAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AircraftAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
