import { Component, OnInit } from '@angular/core';
import { FlightItem } from '../../app-logic/models/flight-item';
import { FlightService } from '../../app-logic/services/flights.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css'],
})
export class FlightsComponent implements OnInit {
  flights!: FlightItem[];
  departingAirportId? : number;
  destinationAirportId? : number;
  departingTime? : Date;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private flightService: FlightService) {
      this.route.params.subscribe((params) => {
        this.departingAirportId = params['departingAirportId'];
        this.destinationAirportId = params['destinationAirportId'];
        this.departingTime = params['departingTime'];
        
      });
    }

  ngOnInit() {
    if(this.departingAirportId && this.destinationAirportId && this.departingTime) {
      this.flightService.searchFlights(this.departingAirportId, this.destinationAirportId, this.departingTime).subscribe(
        (flights) => {
          this.flights = flights;
          console.table(this.flights);
        },
        (error) => {
          console.error('Failed to load flights', error);
        }
      );
    }
    else
    {
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
  }

  trackByFlightNumber(index: number, flight: FlightItem): number {
    return flight.flightNumber;
  }
}
