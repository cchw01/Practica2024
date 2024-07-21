import { Component, OnInit } from '@angular/core';
import { FlightItem } from '../../app-logic/models/flight-item';
import { FlightMockService } from '../../app-logic/services/flight-mock.service';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrl: './flights.component.css',
})
export class FlightsComponent implements OnInit {
  flights!: FlightItem[];

  constructor(flightMockService: FlightMockService) {
    this.flights = flightMockService.getFlightsData();
  }

  ngOnInit() {
    console.table(this.flights);
  }
}
