import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FlightService } from '../../../../app-logic/services/flights.service';
import { AirportListMockService } from '../../../../app-logic/services/airport-service';
import { AircraftsListMockServices } from '../../../../app-logic/services/aircrafts-service';
import { Observable } from 'rxjs';
import { AirportItem } from '../../../../app-logic/models/airport-item';
import { AircraftItem } from '../../../../app-logic/models/aircraft-item';

@Component({
  selector: 'app-add-flight',
  templateUrl: './add-flight.component.html',
  styleUrls: ['./add-flight.component.css'],
})
export class AddFlightComponent implements OnInit {
  addFlightForm!: FormGroup;
  flightId!: number;
  airports$: Observable<AirportItem[]>;
  aircrafts$: Observable<AircraftItem[]>;

  constructor(
    private formBuilder: FormBuilder,
    private flightService: FlightService,
    private airportService: AirportListMockService,
    private aircraftService: AircraftsListMockServices,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.flightId = params['flightNumber'] ? +params['flightNumber'] : 0;
    });

    this.addFlightForm = this.formBuilder.group({
      departingAirportId: ['', Validators.required],
      destinationAirportId: ['', Validators.required],
      aircraftId: ['', Validators.required],
      departingTime: ['', Validators.required],
      flightTime: ['', Validators.required],
      flightCost: ['', Validators.required],
    });

    this.airports$ = this.airportService.getDataAirports();
    this.aircrafts$ = this.aircraftService.getData();
  }

  ngOnInit(): void {
    if (this.flightId) {
      this.loadFlight(this.flightId);
    }
  }

  loadFlight(flightNumber: number): void {
    this.flightService.getFlight(flightNumber).subscribe((flight) => {
      this.addFlightForm.patchValue({
        departingAirportId: flight.departingAirportId,
        destinationAirportId: flight.destinationAirportId,
        aircraftId: flight.aircraftId,
        departingTime: flight.departingTime,
        flightTime: flight.flightTime,
        flightCost: flight.flightCost,
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
            flightNumber: this.flightId,
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
