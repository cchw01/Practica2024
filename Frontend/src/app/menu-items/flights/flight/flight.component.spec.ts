import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightComponent } from './flight.component';

describe('FlightComponent', () => {
  let component: FlightComponent;
  let fixture: ComponentFixture<FlightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
