import { AirportItem } from './airport-item.model';
import { DiscountItem } from './discount-item.model';
import { AircraftItem } from './aircraft-item.model';

export interface FlightItem {
  flightNumber: number;
  departingAirport: AirportItem;
  destinationAirport: AirportItem;
  departingTime: Date;
  flightTime: number;
  Aircraft: AircraftItem;
  flightCost: number;
  discountOffer: DiscountItem;
}
