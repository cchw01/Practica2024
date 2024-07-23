import { Component, OnInit } from '@angular/core';
import { AirportListMockService } from '../../app-logic/services/airport-service';
import { AirportItem } from '../../app-logic/models/airport-item';
import { DiscountListMockService } from '../../app-logic/discount-list-mock.service';
import { DiscountItem } from '../../app-logic/models/discount-item';

import { Observable } from 'rxjs';

import { Router } from '@angular/router';
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
  minDate: Date; // minimum date a user can pick
  form: FormGroup; // used to validate information picked

  formData: { [key: string]: any } = {
    departingAirport: '',
    destinationAirport: '',
    departingTime: '',
    returnTime: '',
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
  ) {
    this.minDate = new Date();
    this.form = new FormGroup({
      departingAirport: new FormControl('', Validators.required),
      destinationAirport: new FormControl('', Validators.required),
      departingTime: new FormControl('', [
        Validators.required,
        this.noPastDatesValidator.bind(this),
      ]),
      returnTime: new FormControl({ value: '', disabled: true }, [
        Validators.required,
        this.noPastDatesValidator.bind(this),
        this.returnDateAfterDepartingDateValidator.bind(this),
      ]),
    });

    this.form.get('departingTime')?.valueChanges.subscribe((value) => {
      const returnTimeControl = this.form.get('returnTime');
      if (value) {
        returnTimeControl?.enable();
        this.form.get('returnTime')?.updateValueAndValidity();
      } else {
        returnTimeControl?.disable();
      }
    });
  }

  noPastDatesValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    //checks if the selected departingDate is in the past and returns an error object if true
    const currentDate = new Date();
    if (control.value && control.value < currentDate) {
      return { pastDate: true };
    }
    return null;
  }

  returnDateAfterDepartingDateValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    //checks if the selected returningDate is before departingDate returns an error object if true
    const departingDate = this.form.get('departingTime')?.value;
    if (
      control.value &&
      departingDate &&
      new Date(control.value) <= new Date(departingDate)
    ) {
      return { invalidReturnDate: true };
    }
    return null;
  }

  dateFilter = (date: Date | null): boolean => {
    return date ? date >= this.minDate : false;
  };

  ngOnInit() {
    this.airportListMockService.getDataAirports().subscribe((data) => {
      this.airports = data;
    });
    this.discounts = this.discountListMockService.getDataDiscounts();
  }

  onInputChange(event: any, field: string) {
    const target = event.target as HTMLInputElement;
    this.formData[field] = target.value;
  }

  onSubmit() {
    if (this.form.invalid) {
      console.log('Form is invalid');
      return;
    }
    this.formData = {
      departingAirport: this.form.get('departingAirport')?.value,
      destinationAirport: this.form.get('destinationAirport')?.value,
      departingTime: this.form.get('departingTime')?.value,
      returnTime: this.form.get('returnTime')?.value,
    };
    console.log(this.form);
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
      this.router.navigate(['/flights/:queryParams'], { queryParams: this.formData });
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