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
  noFlightsAvailable: boolean = false;
  discountFlightId?: number;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private flightService: FlightService) {
      this.route.params.subscribe((params) => {
        this.departingAirportId = params['departingAirportId'];
        this.destinationAirportId = params['destinationAirportId'];
        this.departingTime = params['departingTime'];
        this.discountFlightId = params['discountFlightId'];
        
      });
    }


    ngOnInit() {
      const currentDate = new Date();
      if(this.departingAirportId && this.destinationAirportId && this.departingTime) {
        this.flightService.searchFlights(this.departingAirportId, this.destinationAirportId, this.departingTime).subscribe(
          (flights) => {
            this.flights = flights;
            console.table(this.flights);
            this.noFlightsAvailable = this.flights.length === 0;
          },
          (error) => {
            console.error('Failed to load flights', error);
            this.noFlightsAvailable = true;
          }
        );
      }
      else if(this.discountFlightId){
        console.log('disountFlightId: ${this.discountFlightId}', this.discountFlightId);
        this.flightService.getFlight(this.discountFlightId).subscribe(
          (flight) => {
            console.log(flight);
            this.flights=[];
            this.flights.push(flight);
            console.table(this.flights);
            this.noFlightsAvailable = this.flights.length === 0;
          },
          (error) => {
            console.error('Failed to load flights', error);
             this.noFlightsAvailable = true;
          }
        );
      }
      else
      {
        this.flightService.getFlights().subscribe(
          (flights) => {
            this.flights = flights.filter(flight => new Date(flight.departingTime) > currentDate);;
            this.noFlightsAvailable = this.flights.length === 0;
            console.table(this.flights);
          },
          (error) => {
            console.error('Failed to load flights', error);
            this.noFlightsAvailable = true;
          }
        );
      }
    }


  trackByFlightNumber(index: number, flight: FlightItem): number {
    return flight.flightNumber;
  }
}
