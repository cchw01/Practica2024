import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DiscountService } from '../../../../app-logic/services/discount.service';
import { DiscountDto } from '../../../../app-logic/DTOs/discount-dto';
import { FlightDto } from '../../../../app-logic/DTOs/flight-dto';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-discount',
  templateUrl: './add-discount.component.html',
  styleUrls: ['./add-discount.component.css'],
})
export class AddDiscountComponent implements OnInit {
  addDiscountForm!: FormGroup;
  discountId!: number;
  flights$: Observable<FlightDto[]>;

  constructor(
    private formBuilder: FormBuilder,
    private discountService: DiscountService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.discountId = params['id'] ? +params['id'] : 0;
    });

    this.addDiscountForm = this.formBuilder.group(
      {
        discountName: ['', Validators.required],
        discountDescription: [
          '',
          [Validators.required, Validators.maxLength(100)],
        ],
        flightId: ['', Validators.required],
        discountPercentage: ['', [Validators.required, Validators.min(1)]],
        startDate: ['', [Validators.required, this.futureDateValidator]],
        endDate: ['', [Validators.required, this.futureDateValidator]],
      },
      { validators: this.dateRangeValidator }
    );

    this.flights$ = this.discountService.getFlights();
  }

  ngOnInit(): void {
    if (this.discountId !== 0) {
      this.discountService
        .getDiscountById(this.discountId)
        .subscribe((discount) => {
          this.addDiscountForm.patchValue({
            discountName: discount.discountName,
            discountDescription: discount.discountDescription,
            flightId: discount.flightId,
            discountPercentage: discount.discountPercentage,
            startDate: this.formatDate(discount.startDate),
            endDate: this.formatDate(discount.endDate),
          });
        });
    }
  }

  private formatDate(date: Date): string {
    const d = new Date(date);
    const year = d.getUTCFullYear();
    const month = String(d.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(d.getUTCDate() + 1).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private futureDateValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    const inputDate = new Date(control.value);
    const currentDate = new Date();

    // This sets the hours of current date and input date to 0, so admins are able to add discounts in the same day
    // because if i wanted to add a discount today, the input date will always be past current date because seconds went by
    inputDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);

    if (inputDate < currentDate) {
      return { pastDate: true };
    }
    return null;
  }

  private dateRangeValidator: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    const startDate = group.get('startDate')?.value;
    const endDate = group.get('endDate')?.value;

    if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
      return { dateRange: true };
    }

    return null;
  };

  onSubmit(): void {
    if (this.addDiscountForm.valid) {
      const formValue = this.addDiscountForm.value;
      const discount: DiscountDto = {
        discountId: this.discountId,
        discountName: formValue.discountName,
        discountDescription: formValue.discountDescription,
        flightId: formValue.flightId,
        discountPercentage: formValue.discountPercentage,
        startDate: new Date(formValue.startDate),
        endDate: new Date(formValue.endDate),
      };

      if (this.discountId === 0) {
        this.discountService.addDiscount(discount).subscribe({
          next: () => this.router.navigate(['/admin/discount']),
          error: (err) => console.error('Add discount failed', err),
        });
      } else {
        this.discountService.updateDiscount(discount).subscribe({
          next: () => this.router.navigate(['/admin/discount']),
          error: (err) => console.error('Update discount failed', err),
        });
      }
    }
  }

  hasError(controlName: string, errorName: string): boolean {
    return (
      this.addDiscountForm.controls[controlName].hasError(errorName) ||
      (this.addDiscountForm.errors && this.addDiscountForm.errors[errorName])
    );
  }
}
