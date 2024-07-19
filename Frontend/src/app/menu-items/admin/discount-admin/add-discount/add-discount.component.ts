import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DiscountDto } from '../../../../app-logic/DTOs/discount-dto';
import { Router, ActivatedRoute } from '@angular/router';
import { DiscountItem } from '../../../../app-logic/models/discount-item';
import { DiscountService } from '../../../../app-logic/services/discount.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-discount',
  templateUrl: './add-discount.component.html',
  styleUrl: './add-discount.component.css'
})
export class AddDiscountComponent {
  addDiscountForm!: FormGroup;
  discount!: any;
  discountId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private discountService: DiscountService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.addDiscountForm = formBuilder.group({});

    this.activatedRoute.params.subscribe((parameters) => {
      if (parameters['id']) {
        this.discountId = parameters['id'];
      } else {
        this.discountId = 0;
      }
    });
  }

  ngOnInit(): void {
    this.discount =
      this.discountId == 0
        ? new Observable<DiscountItem>()
        : this.discountService.getDiscountById(this.discountId);

    this.addDiscountForm = this.formBuilder.group({
      name: [this.discount.discountName, Validators.required],
      flights: [
        this.discount.flights,
        Validators.maxLength(100) && Validators.required,
      ],
      discountPercentage: [this.discount.discountPercentage, Validators.required],
      discountName: [this.discount.discountName, Validators.required],
      discountDescription: [this.discount.discountDescription, Validators.required],
      startDate: [this.discount.startDate, Validators.required],
      endDate: [this.discount.endDate, Validators.required],

      createdAt: [
        this.discount.createdAt?.toISOString().split('T')[0],
        Validators.required,
      ],
    });
  }

  onSubmit() {
    if (this.discountId == 0) {
      this.discount = new DiscountItem(this.addDiscountForm.value);
      this.discount.modifiedAt = new Date();
      this.discount.deleted = false;
      this.discount.id = this.discountService.getLastId() + 1;
      this.discountService.addDiscount(this.discount);
    } else {
      this.discount.discountId = this.addDiscountForm.value.discountId;
      this.discount.flights = this.addDiscountForm.value.flights;
      this.discount.discountPercentage = this.addDiscountForm.value.discountPercentage;
      this.discount.discountName = this.addDiscountForm.value.discountName;
      this.discount.discountDescription = this.addDiscountForm.value.discountDescription;
      this.discount.startDate = new Date(this.addDiscountForm.value.startDate);
      this.discount.endDate = new Date(this.addDiscountForm.value.endDate);
    }
    this.router.navigate(['admin/discount']);
  }

  hasError(controlName: string, errorName: string) {
    return this.addDiscountForm.controls[controlName].hasError(errorName);
  }
}
