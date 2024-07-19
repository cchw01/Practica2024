import { Component, OnInit } from '@angular/core';
import { FlightsService } from '../../app-logic/services/flights.service';
import { FlightItem } from '../../app-logic/models/flight-item';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrl: './flights.component.css'
})
export class FlightsComponent implements OnInit {
  flights!: FlightItem[];

  constructor(flightsService : FlightsService) {
    this.flights = flightsService.getFlightsData();
  }

  ngOnInit() {
    console.table(this.flights);
  }

  

}
