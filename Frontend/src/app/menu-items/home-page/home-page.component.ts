import { Component, OnInit } from '@angular/core';
import { AirportListMockService } from '../../app-logic/services/airport-service';
import { AirportItem } from '../../app-logic/models/airport-item';
import { DiscountListMockService } from '../../app-logic/discount-list-mock.service';
import { DiscountItem } from '../../app-logic/models/discount-item';
import { Router } from '@angular/router';
import { format } from 'date-fns';
import { ContentObserver } from '@angular/cdk/observers';
import { FormControl, Validators, AbstractControl, FormGroup  } from '@angular/forms';
import { DiscountImageGalleryService } from '../../app-logic/services/discount-image-gallery.service';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',

  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  minDate : Date;                   // minimum date a user can pick
  form: FormGroup;                  // used to validate information picked

  formData: { [key: string]: any } = {
    departingAirport: '',
    destinationAirport: '',
    departingTime: '',
    returnTime: '',
  };

  seasonDiscountImages: { [key: string]: string[] } = {};
  usedImages: { [key: string]: string[] } = {};

  description: string = 'Example description'; // Aceasta va fi descrierea ta
  errorMessage = '';
  currentSlide: number = 0;
  airports: AirportItem[] = [];
  discounts: DiscountItem[] = [];

  constructor(
    private airportListMockService: AirportListMockService,
    private discountListMockService: DiscountListMockService,
    private router: Router,
    private discountImageGalleryService: DiscountImageGalleryService
  ) {
    this.minDate = new Date();
    this.form = new FormGroup({
      departingAirport: new FormControl('', Validators.required),
      destinationAirport: new FormControl('', Validators.required),
      departingTime: new FormControl('', [Validators.required, this.noPastDatesValidator.bind(this)]),
      //returnTime: new FormControl({ value: '', disabled: true }, [Validators.required, this.noPastDatesValidator.bind(this), this.returnDateAfterDepartingDateValidator.bind(this)]),
      passengers: new FormControl({ value: 1, disabled: true })
    });
    /*
    this.form.get('departingTime')?.valueChanges.subscribe(value => {
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
    */
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

  dateFilter = (date: Date | null): boolean => {
    return date ? date >= this.minDate : false;
  };

  getAirportByName(airportName: string): AirportItem | undefined {
    const airport = this.airports.find(airport => airport.airportName === airportName);
    console.log(`Finding airport for ${airportName}:`, airport);
    return airport;
  }

  getSeasonFromDate(date: Date): string {
    const month = date.getMonth(); // 0 = January, 11 = December
    if (month >= 0 && month <= 1 || month === 11) return 'Winter';
    if (month >= 2 && month <= 4) return 'Spring';
    if (month >= 5 && month <= 7) return 'Summer';
    if (month >= 8 && month <= 10) return 'Fall';
    return 'Winter'; 
  }

  getImageForDiscount(discount: DiscountItem): string {
    const season = this.getSeasonFromDate(new Date(discount.startDate)); 
    const images = this.seasonDiscountImages[season];
    if (!this.usedImages[season]) {
        this.usedImages[season] = [];
    }

    let selectedImage: string;
    while (true) {
        selectedImage = images[Math.floor(Math.random() * images.length)];
        const imageIsUsed = this.usedImages[season].includes(selectedImage);
        if (this.usedImages[season].length == this.seasonDiscountImages[season].length)
          this.usedImages[season] = [];
        if (!imageIsUsed) {
            this.usedImages[season] = [...this.usedImages[season], selectedImage];
            return selectedImage;
            break;                                                
        } 
      }
    }
    

  ngOnInit() {
    this.airportListMockService.getDataAirports().subscribe((data) => {
      this.airports = data;
      console.log('Airports:', this.airports); 
    });
    this.discounts = this.discountListMockService.getDataDiscounts();
    this.seasonDiscountImages = this.discountImageGalleryService.getSeasonImages();
  }

  onInputChange(event: any, field: string) {
    console.log(`onInputChange called for ${field}`);
    const value = event.value;                             // get the date value from event.value
    if(field == "departingTime") {
      const formattedDate = format(new Date(value), 'dd.MM.yyyy');
      this.formData[field] = formattedDate;
      //this.form.get(field)?.setValue(formattedDate);     // update the FormControl value
    } else {
      this.formData[field] = value;
    }
    console.log(`Updated ${field}:`, this.formData[field]); 
  }

  onSubmit() {
    const departingAirport = this.getAirportByName(this.formData['departingAirport']);
    const destinationAirport = this.getAirportByName(this.formData['destinationAirport']);
    console.log(`${departingAirport?.airportId}    ${destinationAirport?.airportId}`);

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
      console.log("Going to the route:  " + `/flights/${departingAirport.airportId}/${destinationAirport.airportId}/${this.formData['departingTime']}`);
      this.router.navigate(
        [
           `/flights/${departingAirport.airportId}/${destinationAirport.airportId}/${this.formData['departingTime']}`
        ], { queryParams: this.formData });
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
