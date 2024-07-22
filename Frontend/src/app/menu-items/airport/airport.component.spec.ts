import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirportComponent } from './airport.component';

describe('AirportComponent', () => {
  let component: AirportComponent;
  let fixture: ComponentFixture<AirportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AirportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AirportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
