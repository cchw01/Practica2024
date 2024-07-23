import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightItem } from '../../app-logic/models/flight-item';
import { FlightService } from '../../app-logic/services/flights.service';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css'],
})

export class FlightsComponent implements OnInit {
  flights!: FlightItem[];
  departingAirportId!: string;
  destinationAirportId!: string;
  departureDate!: string;

  constructor(
    private flightService: FlightService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.departingAirportId = params.get('departingAirportId') || '';
      this.destinationAirportId = params.get('destinationAirportId') || '';
      this.departureDate = params.get('departureDate') || '';

      this.getFlights();
    });
  }

  getFlights() {
    this.flightService
      .getFlightsByCriteria(
        this.departingAirportId,
        this.destinationAirportId,
        this.departureDate
      )
      .subscribe(
        (flights) => {
          this.flights = flights;
          console.table(this.flights);
        },
        (error) => {
          console.error('Failed to load flights', error);
        }
      );
  }


  bookFlight(flightNumber: number) {
    this.router.navigate(['/booking', flightNumber]);
  }

  trackByFlightNumber(index: number, flight: FlightItem): number {
    return flight.flightNumber;
  }
}
