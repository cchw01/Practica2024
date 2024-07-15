import { TicketItem } from "./ticket-item";
export enum IdDocumentType {
    IdentityCard,
    Passport,
    DriverLicense
}

export interface CheckInItem {
    checkInId: number;
    ticket: TicketItem;
    passengerName: string;
    idDocumentType: IdDocumentType;
    documentData: string;
    checkInStatus: boolean;
    passengerEmail: string;
}
