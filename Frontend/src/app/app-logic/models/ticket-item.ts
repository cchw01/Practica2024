import { FlightItem } from './flight-item';
import { UserItem } from './user-item';

export class TicketItem {
  ticketId!: number;
  flight!: FlightItem;
  passenger!: UserItem;
  flightId?: number;
  userId?: number;
  checkInId!: number;
  luggage!: boolean;
  price!: number;

  constructor(ticket?: Partial<TicketItem>) {
    Object.assign(this, ticket);
  }
}
