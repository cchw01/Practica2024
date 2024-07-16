export class AircraftItem {
  registrationNumber!: string;
  maker!: string;
  model!: string;
  numberOfSeats!: number;
  autonomyInHours!: number;
  maxCargo!: number;

  constructor(aircraft?: Partial<AircraftItem>) {
    Object.assign(this, aircraft);
  }
}
