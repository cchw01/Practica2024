import { Component, OnInit } from '@angular/core';
import { AirportListMockService } from '../../app-logic/airport-list-mock.service';
import { AirportItem } from '../../app-logic/models/airport-item';
import { DiscountListMockService } from '../../app-logic/discount-list-mock.service';
import { DiscountItem } from '../../app-logic/models/discount-item';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  formData: { [key: string]: any } = {
    departingairport: '',
    destinationAirport: '',
    departingTime: '',
    returnTime: '',
    passengers: 1,
  };

  description: string = 'Example description'; // Aceasta va fi descrierea ta
  airports: Array<AirportItem> = [];
  discounts: Array<DiscountItem> = [];
  currentSlide: number = 0;

  constructor(
    private airportListMockService: AirportListMockService,
    private discountListMockService: DiscountListMockService,
    private router: Router
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
    // Redirecționare către pagina de booking
    this.router.navigate(['/flights'], {});
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
