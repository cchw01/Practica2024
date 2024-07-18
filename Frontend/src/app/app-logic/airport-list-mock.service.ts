import { Injectable } from '@angular/core';
import { FlightItem } from './models/flight-item';
import { AirportItem } from './models/airport-item';
import { AircraftItem } from './models/aircraft-item';
import { DiscountItem } from './models/discount-item';
import { UserItem } from './models/user-item';
import { TicketItem } from './models/ticket-item';
import { CheckInItem, IdDocumentType } from './models/checkin-item';

@Injectable({
  providedIn: 'root',
})
export class AirportListMockService {
  airportsData: Array<AirportItem> = [
    {
      airportId: 0    ,
      airportName: '',
      location: '',
    },
    {
      airportId: 1,
      airportName: 'AeroportA',
      location: 'LocatiaA',
    },
    {
      airportId: 2,
      airportName: 'AeroportB',
      location: 'LocatiaB',
    },
    {
      airportId: 3,
      airportName: 'AeroportC',
      location: 'LocatiaC',
    },
    {
      airportId: 4,
      airportName: 'AeroportD',
      location: 'LocatiaD',
    },
  ];

  getDataAirports(): Array<AirportItem> {
    return this.airportsData;
  }
}
