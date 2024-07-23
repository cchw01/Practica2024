import { AirportItem } from './airport-item';
import { DiscountItem } from './discount-item';
import { AircraftItem } from './aircraft-item';

export class FlightItem {
  flightNumber!: number;
  departingAirport!: AirportItem;
  destinationAirport!: AirportItem;
  departingTime!: Date;
  flightTime!: number;
  aircraft!: AircraftItem;
  flightCost!: number;
  discountOffer?: DiscountItem;
  departingAirportId!: number;
  destinationAirportId!: number;
  aircraftId!:number;

  constructor(flight?: Partial<FlightItem>) {
    Object.assign(this, flight);
  }
}
