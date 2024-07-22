import { FlightItem } from './flight-item';
import { UserItem } from './user-item';

export class TicketItem {
  tickedId!: number;
  flight!: FlightItem;
  passager!: UserItem;
  flightId?: number; 
  userId?: number; 
  checkInId?: number;
  checkIn!: boolean;
  luggage!: boolean;
  price!: number;

  constructor(ticket?: Partial<TicketItem>) {
    Object.assign(this, ticket);
  }
}
