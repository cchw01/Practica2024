import { FlightItem } from './flight-item';

export interface DiscountItem {
  discountId: number;
  flights: FlightItem[];
  discountPercentage: number;
  discountName: string;
  discountDescription: string;
  startDate: Date;
  endDate: Date;
}
