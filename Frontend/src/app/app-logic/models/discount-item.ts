import { FlightItem } from './flight-item';

export class DiscountItem {
  discountId!: number;
  flightId!: number;
  discountPercentage!: number;
  discountName!: string;
  discountDescription!: string;
  startDate!: Date;
  endDate!: Date;

  constructor(discount?: Partial<DiscountItem>) {
    Object.assign(this, discount);
  }
}
