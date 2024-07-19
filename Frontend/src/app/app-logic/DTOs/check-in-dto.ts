import { IdDocumentType } from "../models/checkin-item";

export interface CheckInDto {
    checkInId: number;
    ticketId: number;
    passengerName: string;
    idDocumentType: IdDocumentType;
    documentData: string;
    checkInStatus: boolean;
    passengerEmail: string;
}

