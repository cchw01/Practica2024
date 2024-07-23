import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAirportComponent } from './add-airport.component';

describe('AddAirportComponent', () => {
  let component: AddAirportComponent;
  let fixture: ComponentFixture<AddAirportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddAirportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAirportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
