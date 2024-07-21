import { Component, Input, OnInit } from '@angular/core';
import { FlightItem } from '../../../app-logic/models/flight-item';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrl: './flight.component.css',
})
export class FlightComponent {
  @Input() flightItem!: FlightItem;
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
}
