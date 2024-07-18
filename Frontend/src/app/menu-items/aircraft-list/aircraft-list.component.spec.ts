import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AircraftComponent } from './aircraft-list.component';

describe('AircraftComponent', () => {
  let component: AircraftComponent;
  let fixture: ComponentFixture<AircraftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AircraftComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AircraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
