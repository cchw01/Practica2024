import { Component, OnInit } from '@angular/core';
import { AirportItem } from '../../app-logic/models/airport-item';
import { AircraftsListMockServices } from '../../app-logic/services/aircrafts-service';
import { DiscountService } from '../../app-logic/services/discount.service';
import { DiscountItem } from '../../app-logic/models/discount-item';
import { Router } from '@angular/router';
import { format } from 'date-fns';
import {
  FormControl,
  Validators,
  AbstractControl,
  FormGroup,
} from '@angular/forms';
import { DiscountImageGalleryService } from '../../app-logic/services/discount-image-gallery.service';
import { AirportListMockService } from '../../app-logic/services/airport-service';

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

  seasonDiscountImages: { [key: string]: string[] } = {};
  usedImages: { [key: string]: string[] } = {};
  imageMapping: { [discountId: number]: string } = {};

  description: string = 'Example description';
  errorMessage = '';
  currentSlide: number = 0;
  airports: AirportItem[] = [];
  discounts: DiscountItem[] = [];

  constructor(
    private discountImageGalleryService: DiscountImageGalleryService,
    private airportService: AirportListMockService,
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

  getSeasonFromDate(date: Date): string {
    const month = date.getMonth(); // 0 = January, 11 = December
    if ((month >= 0 && month <= 1) || month === 11) return 'Winter';
    if (month >= 2 && month <= 4) return 'Spring';
    if (month >= 5 && month <= 7) return 'Summer';
    if (month >= 8 && month <= 10) return 'Fall';
    return 'Winter';
  }

  initializeImageMapping() {
    for (const discount of this.discounts) {
      const season = this.getSeasonFromDate(new Date(discount.startDate));
      const images = this.seasonDiscountImages[season];
      let selectedImage: string;
      while (true) {
        selectedImage = images[Math.floor(Math.random() * images.length)];
        if (!Object.values(this.imageMapping).includes(selectedImage)) {
          this.imageMapping[discount.discountId] = selectedImage;
          break;
        }
      }
    }
    console.log('Image Mapping:', this.imageMapping);
  }

  ngOnInit() {
    this.airportService.getAll().subscribe((data) => {
      this.airports = data;
      console.log('Airports:', this.airports);
    });

    this.discountService.getDiscounts().subscribe((data) => {
      this.discounts = data;
      console.log('Discounts:', this.discounts);
    });
    this.discountService.getDiscounts().subscribe((data) => {
      this.discounts = data;
      this.seasonDiscountImages =
        this.discountImageGalleryService.getSeasonImages();
      this.initializeImageMapping();
    });
  }

  onInputChange(event: any, field: string) {
    console.log(`onInputChange called for ${field}`);
    const value = event.value; // get the date value from event.value
    if (field == 'departingTime') {
      const formattedDate = format(new Date(value), 'yyyy-MM-dd');
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
      this.router.navigate([
        `/flights/${departingAirport.airportId}/${destinationAirport.airportId}/${this.formData['departingTime']}`,
      ]);
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
  openDiscountFlight(discountFlightId: number) {
    if (discountFlightId) {
      console.log(
        'Going to the route:  ' + `/flights/discount-flight/${discountFlightId}`
      );
      this.router.navigate([`/flights/discounted-flight/${discountFlightId}`]);
    } else {
      console.log(this.errorMessage);
    }
  }
}
