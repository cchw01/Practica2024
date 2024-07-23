import { Component, OnInit } from '@angular/core';
import { FlightItem } from '../../app-logic/models/flight-item';
import { FlightService } from '../../app-logic/services/flights.service';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css'],
})
export class FlightsComponent implements OnInit {
  flights!: FlightItem[];

  constructor(private flightService: FlightService) {}

  ngOnInit() {
    this.flightService.getFlights().subscribe(
      (flights) => {
        this.flights = flights;
        console.table(this.flights);
      },
      (error) => {
        console.error('Failed to load flights', error);
      }
    );
  }

  trackByFlightNumber(index: number, flight: FlightItem): number {
    return flight.flightNumber;
  }
}
