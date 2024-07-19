import { TicketItem } from './ticket-item';

export class UserItem {
  userId!: number;
  name!: string;
  role!: string;
  emailAddress!: string;
  password!: string;
  ticketList?: TicketItem[];

  constructor(user?: Partial<UserItem>) {
    Object.assign(this, user);
  }
}
