import { Component, OnInit } from '@angular/core';
import { FlightsService } from '../../app-logic/services/flights.service';
import { FlightItem } from '../../app-logic/models/flight-item';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrl: './flights.component.css',
})
export class FlightsComponent implements OnInit {
  loadedFlights: FlightItem[] = [];
  isFetching = false;

  constructor(private flightsService: FlightsService) {}

  ngOnInit() {
    this.isFetching = true;
    this.flightsService.getFlights().subscribe((flights) => {
      this.isFetching = false;
      this.loadedFlights = flights;
    });
  }
}
