export class AirportItem {
  airportId!: number;
  airportName!: string;
  location!: string;
  
  constructor(airport?: Partial<AirportItem>) {
    Object.assign(this, airport);
  }
}
