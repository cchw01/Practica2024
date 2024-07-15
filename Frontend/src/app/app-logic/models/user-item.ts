import { Ticket } from './ticket-item';

export interface UserItem {
  userId: number;
  name: string;
  role: string;
  emailAddress: string;
  password: string;
  ticketList: Ticket[];
}