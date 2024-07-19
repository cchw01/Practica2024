export interface DiscountDto {
    discountId: number;
    discountName: string;
    discountDescription: string;
    flightId: number;
    discountPercentage: number;
    startDate: Date;
    endDate: Date;
}