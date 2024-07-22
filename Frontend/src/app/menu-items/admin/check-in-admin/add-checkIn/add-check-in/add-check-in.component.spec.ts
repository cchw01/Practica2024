import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCheckInComponent } from './add-check-in.component';

describe('AddCheckInComponent', () => {
  let component: AddCheckInComponent;
  let fixture: ComponentFixture<AddCheckInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddCheckInComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCheckInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
