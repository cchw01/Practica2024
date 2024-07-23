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
import { FlightItem } from '../../../../app-logic/models/flight-item';

@Component({
  selector: 'app-add-flight',
  templateUrl: './add-flight.component.html',
  styleUrl: './add-flight.component.css',
})
export class AddFlightComponent {
  addFlightForm!: FormGroup;
  flightId!: number;
  flights: FlightItem[] = [];

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

  ngOnInit(): void {
    if (this.flightId) {
      this.loadFlight(this.flightId);
    }
  }

  loadFlight(flightNumber: number): void {
    this.flightService.getFlight(flightNumber).subscribe((flight) => {
      this.addFlightForm.patchValue({
        flightNumber: flight.flightNumber,
        departingAirportId: flight.departingAirport.airportId,
        destinationAirportId: flight.destinationAirport.airportId,
        aircraftId: flight.aircraft.aircraftId,
        departingTime: flight.departingTime,
        flightTime: flight.flightTime,
        flightCost: flight.flightCost,
        discountId: flight.discountOffer?.discountId,
      });
    });
  }

  onSubmit(): void {
    const flightData = this.addFlightForm.value;
    if (this.addFlightForm.valid) {
      if (this.flightId) {
        this.flightService
          .updateFlight({
            ...flightData,
            id: this.flightId,
          })
          .subscribe(() => {
            this.router.navigate(['/admin/flights']);
          });
      } else {
        this.flightService.addFlight(flightData).subscribe(() => {
          this.router.navigate(['/admin/flights']);
        });
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
