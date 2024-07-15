import { TicketItem } from "./ticket-item";
export enum IdDocumentType {
    IdentityCard,
    Passport,
    DriverLicense
}

export interface CheckInItem {
    CheckInId: number;
    Ticket: TicketItem;
    PassengerName: string;
    IdDocumentType: IdDocumentType;
    DocumentData: string;
    CheckInStatus: boolean;
    PassengerEmail: string;
}
