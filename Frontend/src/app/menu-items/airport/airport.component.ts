import { Component } from '@angular/core';

@Component({
  selector: 'app-airport',
  templateUrl: './airport.component.html',
  styleUrl: './airport.component.css'
})
export class AirportComponent {

  airports = [
    { airportId: 1, airportName: 'JFK International', location: 'New York, USA' },
    { airportId: 2, airportName: 'LAX', location: 'Los Angeles, USA' },
    { airportId: 3, airportName: 'Heathrow', location: 'London, UK' },
    { airportId: 4, airportName: 'Changi', location: 'Singapore' }
  ];

  airportColumns: string[] = ['id', 'airportName', 'location']; 

  

}
