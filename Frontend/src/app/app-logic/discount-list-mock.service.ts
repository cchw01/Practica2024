import { Injectable } from '@angular/core';
import { FlightItem } from './models/flight-item';
import { AirportItem } from './models/airport-item';
import { AircraftItem } from './models/aircraft-item';
import { DiscountItem } from './models/discount-item';
import { UserItem } from './models/user-item';
import { TicketItem } from './models/ticket-item';
import { CheckInItem, IdDocumentType } from './models/checkin-item';

@Injectable({
  providedIn: 'root',
})
export class DiscountListMockService {
  discountsData: Array<DiscountItem> = [
    {
      discountId: 1,
      flightId: 0,
      discountPercentage: 10,
      discountName: 'Summer Sale',
      discountDescription: '10% off on all summer flights',
      startDate: new Date('2024-06-01'),
      endDate: new Date('2024-08-31'),
    },
    {
      discountId: 2,
      flightId: 0,
      discountPercentage: 15,
      discountName: 'Winter Wonderland',
      discountDescription: '15% off on all winter flights',
      startDate: new Date('2024-12-01'),
      endDate: new Date('2025-02-28'),
    },
    {
      discountId: 3,
      flightId: 0,
      discountPercentage: 20,
      discountName: 'Early Bird',
      discountDescription: '20% off on early bookings',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-12-31'),
    },

    {
      discountId: 4,
      flightId: 0,
      discountPercentage: 10,
      discountName: 'Summer Sale',
      discountDescription: '10% off on all summer flights',
      startDate: new Date('2024-06-01'),
      endDate: new Date('2024-08-31'),
    },
  ];

  constructor() {}

  getDataDiscounts(): Array<DiscountItem> {
    return this.discountsData;
  }
}
