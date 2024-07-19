export class AircraftItem {
  aircraftId!: number;
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
