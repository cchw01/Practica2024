import { Component, OnInit } from '@angular/core';
import { AirportListMockService } from '../../app-logic/airport-list-mock.service';
import { AirportItem } from '../../app-logic/models/airport-item';
import { DiscountListMockService } from '../../app-logic/discount-list-mock.service';
import { DiscountItem } from '../../app-logic/models/discount-item';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit {
  formData: { [key: string]: any } = {
    departingairport: '',
    destinationAirport: '',
    departingTime: '',
    returnTime: '',
    passengers: 1,
  };

  airports: Array<AirportItem> = [];
  discounts: Array<DiscountItem> = [];

  constructor(
    private airportListMockService: AirportListMockService,
    private discountListMockService: DiscountListMockService
  ) {}

  ngOnInit() {
    this.airports = this.airportListMockService.getDataAirports();
    this.discounts = this.discountListMockService.getDataDiscounts();
  }

  onInputChange(event: Event, field: string) {
    const target = event.target as HTMLInputElement;
    this.formData[field] = target.value;
  }

  onSubmit() {
    // Logica pentru submit
    console.log(this.formData);
  }
}
