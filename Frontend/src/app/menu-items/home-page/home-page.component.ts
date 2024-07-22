import { Component, OnInit } from '@angular/core';
import { AirportListMockService } from '../../app-logic/airport-list-mock.service';
import { AirportItem } from '../../app-logic/models/airport-item';
import { DiscountListMockService } from '../../app-logic/discount-list-mock.service';
import { DiscountItem } from '../../app-logic/models/discount-item';

import { Observable } from 'rxjs';

import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',

  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  formData: { [key: string]: any } = {
    departingAirport: '',
    destinationAirport: '',
    departingTime: '',
    returnTime: '',
    passengers: 1,
  };

  description: string = 'Example description'; // Aceasta va fi descrierea ta
  errorMessage = '';
  currentSlide: number = 0;
  airports: AirportItem[] = [];
  discounts: DiscountItem[] = [];

  constructor(
    private airportListMockService: AirportListMockService,
    private discountListMockService: DiscountListMockService,
    private router: Router
  ) {}

  ngOnInit() {
    this.airportListMockService.getDataAirports().subscribe((data) => {
      this.airports = data;
    });
    this.discounts = this.discountListMockService.getDataDiscounts();
  }

  onInputChange(event: Event, field: string) {
    const target = event.target as HTMLInputElement;
    this.formData[field] = target.value;
  }

  onSubmit() {
    console.log(this.formData);
    if (
      this.formData['departingAirport'] === this.formData['destinationAirport']
    ) {
      this.errorMessage +=
        'Departing airport and destination airport cannot be the same.';
    }
    if (
      new Date(this.formData['departingTime']) >=
      new Date(this.formData['returnTime'])
    ) {
      this.errorMessage += 'Departing time must be before return time.';
    }

    if (this.errorMessage == '') {
      this.router.navigate(['/flights'], { queryParams: this.formData });
    } else {
      console.log(this.errorMessage);
    }
  }
  getTransform(): string {
    return `translateX(-${this.currentSlide * 33.33}%)`;
  }

  prevSlide() {
    this.currentSlide =
      this.currentSlide > 0 ? this.currentSlide - 1 : this.discounts.length - 3;
  }

  nextSlide() {
    this.currentSlide =
      this.currentSlide < this.discounts.length - 3 ? this.currentSlide + 1 : 0;
  }
}
