import { FlightItem } from './flight-item';
import { UserItem } from './user-item';
import { CheckInItem } from './checkin-item';

export interface TicketItem {
  tickedId: number;
  flight: FlightItem;
  passager: UserItem;
  checkIn: CheckInItem;
  luggage: boolean;
  price: number;
}
