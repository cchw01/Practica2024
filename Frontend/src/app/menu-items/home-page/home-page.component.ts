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

    // Logic for submit
    console.log(this.formData);

    // Redirecționare către pagina de booking
    this.router.navigate(['/flights'], {});

  }
  
}
