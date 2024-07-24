import { Component, Input } from '@angular/core';
import { FlightItem } from '../../../app-logic/models/flight-item';
import { DiscountItem } from '../../../app-logic/models/discount-item';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css'],
})
export class FlightComponent {
  @Input() flightItem!: FlightItem;
  constructor(private router: Router) {}

  get discountedPrice(): number {
    if (
      this.flightItem.discountOffer &&
      this.flightItem.discountOffer.discountPercentage
    ) {
      return (
        this.flightItem.flightCost -
        (this.flightItem.flightCost *
          this.flightItem.discountOffer.discountPercentage) /
          100
      );
    }
    return this.flightItem.flightCost; // Return original price if no discount
  }

  isDiscountValid(discount: DiscountItem): boolean {
    const currentDate = new Date();
    return discount && currentDate >= discount.startDate && currentDate <= discount.endDate;
  }

  goToBooking()
  {
    this.router.navigate(['/booking', this.flightItem.flightNumber]);
  }
}
