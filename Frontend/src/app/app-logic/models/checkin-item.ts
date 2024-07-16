import { TicketItem } from './ticket-item';
export enum IdDocumentType {
  IdentityCard,
  Passport,
  DriverLicense,
}

export class CheckInItem {
  checkInId!: number;
  ticket!: TicketItem;
  passengerName!: string;
  idDocumentType!: IdDocumentType;
  documentData!: string;
  checkInStatus!: boolean;
  passengerEmail!: string;

  constructor(checkin?: Partial<CheckInItem>) {
    Object.assign(this, checkin);
  }
}
