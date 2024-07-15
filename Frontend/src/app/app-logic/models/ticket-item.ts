import { FlightItem } from './flight-item.model';
import { UserItem } from './user-item';
import { CheckInItem } from './checkin-item';

export interface TicketItem {
    TicketId: number;
    Flight: FlightItem;
    Passanger: UserItem;
    CheckIn: CheckInItem;
    Luggage: boolean;
    Price: number;
}
