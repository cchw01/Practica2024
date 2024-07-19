export interface TicketDto {
    ticketId: number;
    flightId: number;
    userId: number;
    checkInId?: number;
    luggage: boolean;
    price: number;
}