import { AirportItem } from './airport-item';
import { DiscountItem } from './discount-item';
import { AircraftItem } from './aircraft-item';
import { Nullable } from 'primeng/ts-helpers';

export class FlightItem {
  flightNumber!: number;
  departingAirport!: AirportItem;
  departingAirportId?: number;
  destinationAirport!: AirportItem;
  destinationAirportId?: number;
  departingTime!: Date;
  flightTime!:number;
  aircraft!: AircraftItem;
  aircraftId?: number;
  flightCost!: number;
  discountOffer?: DiscountItem;
  discountOfferId?:number;

  constructor(flight?: Partial<FlightItem>) {
    Object.assign(this, flight);
  }
}
