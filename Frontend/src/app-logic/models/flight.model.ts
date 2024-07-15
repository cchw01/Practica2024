import { Airport } from './airport.model';
import { Discount } from './discount.model';
import { Aircraft } from './aircraft.model';

export interface Flight {
  flightNumber: number;
  departingAirport: Airport;
  destinationAirport: Airport;
  departingTime: Date;
  flightTime: number;
  Aircraft: Aircraft;
  flightCost: number;
  discountOffer: Discount;
}
 