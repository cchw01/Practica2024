import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { FlightService } from '../../../../app-logic/services/flights.service';

@Component({
  selector: 'app-add-flight',
  templateUrl: './add-flight.component.html',
  styleUrl: './add-flight.component.css',
})
export class AddFlightComponent {
  addFlightForm!: FormGroup;
  flightId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private flightService: FlightService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.flightId = params['id'] ? +params['id'] : 0;
    });

    this.addFlightForm = this.formBuilder.group({
      flightNumber: ['', Validators.required],
      departingAirportId: ['', Validators.required],
      destinationAirportId: ['', Validators.required],
      aircraftId: ['', Validators.required],
      departingTime: ['', Validators.required],
      flightTime: ['', Validators.required],
      flightCost: ['', Validators.required],
      discountId: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    const flightData = this.addFlightForm.value;
    if (this.addFlightForm.valid) {
      if (this.flightId) {
        this.flightService.updateFlight({
          ...flightData,
          id: this.flightId,
        });
      } else {
        this.flightService.addFlight(flightData);
      }
    }
  }

  hasError(controlName: string, errorName: string): boolean {
    return (
      this.addFlightForm.controls[controlName].hasError(errorName) ||
      (this.addFlightForm.errors && this.addFlightForm.errors[errorName])
    );
  }
}
