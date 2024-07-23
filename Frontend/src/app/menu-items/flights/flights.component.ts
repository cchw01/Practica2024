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
  flights: FlightItem[] = [];
  departingAirportId!: number;
  destinationAirportId!: number;
  departureDate!: Date;

  constructor(
    private flightService: FlightService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const departingAirportIdParam = params.get('departingAirportId');
      const destinationAirportIdParam = params.get('destinationAirportId');
      const departureDateParam = params.get('departureDate');

      if (departingAirportIdParam) {
        this.departingAirportId = +departingAirportIdParam;
      }
      if (destinationAirportIdParam) {
        this.destinationAirportId = +destinationAirportIdParam;
      }
      if (departureDateParam) {
        this.departureDate = new Date(departureDateParam);
      }

      this.getFlights();
    });
  }

  getFlights() {
    // if(this.departingAirportId==(null||undefined)){
    //   this.flightService.getFlights().subscribe(
    //     (flights) => {
    //       this.flights = flights;
    //       console.table(this.flights);
    //     },
    //     (error) => {
    //       console.error('Failed to load flights', error);
    //     }
    //   );
    // }
    // else
    this.flightService
      .searchFlights(this.departingAirportId, this.destinationAirportId, this.departureDate)
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
