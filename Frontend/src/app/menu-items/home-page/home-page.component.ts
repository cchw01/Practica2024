import { Component, OnInit } from '@angular/core';
import { AirportListMockService } from '../../app-logic/services/airport-service';
import { AirportItem } from '../../app-logic/models/airport-item';
import { DiscountService } from '../../app-logic/services/discount.service';
import { DiscountItem } from '../../app-logic/models/discount-item';
import { Router } from '@angular/router';
import { format } from 'date-fns';
import { ContentObserver } from '@angular/cdk/observers';
import {
  FormControl,
  Validators,
  AbstractControl,
  FormGroup,
} from '@angular/forms';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  minDate: Date;
  form: FormGroup;
  formData: { [key: string]: any } = {
    departingAirport: '',
    destinationAirport: '',
    departingTime: '',
    returnTime: '',
  };
  description: string = 'Example description';
  errorMessage = '';
  currentSlide: number = 0;
  airports: AirportItem[] = [];
  discounts: DiscountItem[] = [];

  constructor(
    private airportListMockService: AirportListMockService,
    private discountService: DiscountService,
    private router: Router
  ) {
    this.minDate = new Date();
    this.form = new FormGroup({
      departingAirport: new FormControl('', Validators.required),
      destinationAirport: new FormControl('', Validators.required),
      departingTime: new FormControl('', [
        Validators.required,
        this.noPastDatesValidator.bind(this),
      ]),
      passengers: new FormControl({ value: 1, disabled: true }),
    });
  }

  noPastDatesValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const currentDate = new Date();
    if (control.value && control.value < currentDate) {
      return { pastDate: true };
    }
    return null;
  }

  dateFilter = (date: Date | null): boolean => {
    return date ? date >= this.minDate : false;
  };

  getAirportByName(airportName: string): AirportItem | undefined {
    const airport = this.airports.find(
      (airport) => airport.airportName === airportName
    );
    console.log(`Finding airport for ${airportName}:`, airport);
    return airport;
  }

  ngOnInit() {
    this.airportListMockService.getDataAirports().subscribe((data) => {
      this.airports = data;
      console.log('Airports:', this.airports);
    });

    this.discountService.getDiscounts().subscribe((data) => {
      this.discounts = data;
      console.log('Discounts:', this.discounts);
    });
  }

  onInputChange(event: any, field: string) {
    console.log(`onInputChange called for ${field}`);
    const value = event.value;
    if (field == 'departingTime') {
      const formattedDate = format(new Date(value), 'dd.MM.yyyy');
      this.formData[field] = formattedDate;
    } else {
      this.formData[field] = value;
    }
    console.log(`Updated ${field}:`, this.formData[field]);
  }

  onSubmit() {
    const departingAirport = this.getAirportByName(
      this.formData['departingAirport']
    );
    const destinationAirport = this.getAirportByName(
      this.formData['destinationAirport']
    );
    console.log(
      `${departingAirport?.airportId}    ${destinationAirport?.airportId}`
    );

    if (this.form.invalid) {
      console.log('Form is invalid');
      return;
    }
    if (
      this.formData['departingAirport'] === this.formData['destinationAirport']
    ) {
      this.errorMessage +=
        'Departing airport and destination airport cannot be the same.';
    }
    console.log(this.formData);
    if (departingAirport && destinationAirport) {
      console.log(
        'Going to the route:  ' +
          `/flights/${departingAirport.airportId}/${destinationAirport.airportId}/${this.formData['departingTime']}`
      );
      this.router.navigate(
        [
          `/flights/${departingAirport.airportId}/${destinationAirport.airportId}/${this.formData['departingTime']}`,
        ],
        { queryParams: this.formData }
      );
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
