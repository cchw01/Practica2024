import { Component, OnInit, ViewChild } from '@angular/core';
import { AircraftsListMockServices } from '../../../../app-logic/services/aircrafts-service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatButton } from '@angular/material/button';
import { SelectionModel } from '@angular/cdk/collections';
import { AircraftDto } from '../../../../app-logic/DTOs/aircraft-dto';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
@Component({
  selector: 'app-add-aircraft',
  templateUrl: './add-aircraft.component.html',
  styleUrl: './add-aircraft.component.css'
})
export class AddAircraftComponent implements OnInit {
  addAircraftForm!: FormGroup;
  aircraftId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private aircraftService: AircraftsListMockServices,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.aircraftId = params['aircraftId'] ? + params['aircraftId'] : 0;
    });

    this.addAircraftForm = this.formBuilder.group({
      registrationNumber: ['', Validators.required],
      maker: ['', [Validators.required, Validators.maxLength(100)]], 
      model: ['', Validators.required],
      numberOfSeats: ['', [Validators.required]],
      autonomyInHours: ['', [Validators.required]],
      maxCargo: ['', [Validators.required],]
  });

  }

  ngOnInit(): void {
    if (this.aircraftId !== 0) {
      this.aircraftService.getItemById(this.aircraftId).subscribe((aircraft) => {
        this.addAircraftForm.patchValue({
          registrationNumber: aircraft.registrationNumber,
          maker: aircraft.maker,
          model: aircraft.model,
          numberOfSeats: aircraft.numberOfSeats,
          autonomyInHours: aircraft.autonomyInHours,
          maxCargo: aircraft.maxCargo
        });
      });
    }
  }

  onSubmit(): void {
    const aircraftData = this.addAircraftForm.value;
    if (this.addAircraftForm.valid) 
      {
      if (this.aircraftId) 
        {
        const updatedAircraftData = 
        {
          ...aircraftData,
          aircraftId: this.aircraftId
        };
        this.aircraftService.updateItem(updatedAircraftData);
        this.router.navigate(['/admin/aircraft']);
        }
      else 
      {
        this.aircraftService.addItem(aircraftData);
        this.router.navigate(['/admin/aircraft']);
      }
      }
    }

      hasError(controlName: string, errorName: string): boolean {
        return this.addAircraftForm.controls[controlName].hasError(errorName) ||
          (this.addAircraftForm.errors && this.addAircraftForm.errors[errorName]);
      }
}
