export interface FlightDto {
    flightNumber: number;
    departingAirportId: number;
    destinationAirportId: number;
    aircraftId: number;
    departingTime: Date;
    flightTime: Date;
    flightCost: number;
    discountId?: number;
}

