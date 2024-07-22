import { FlightItem } from './flight-item';
import { UserItem } from './user-item';
import { CheckInItem } from './checkin-item';

export class TicketItem {
  ticketId!: number; //corecteat din tickedId in ticketId
  flightId?: number;
  flight!: FlightItem;
  userId?: number; 
  passager!: UserItem;
  checkInId?: number;
  checkIn?: boolean;
  luggage!: boolean;
  price!: number;

  constructor(ticket?: Partial<TicketItem>) {
    Object.assign(this, ticket);
  }
}
