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
      this.aircraftId = params['id'] ? +params['id'] : 0;
    });

    this.addAircraftForm = this.formBuilder.group({
      registrationNumber: ['', Validators.required],
      Maker: ['', [Validators.required, Validators.maxLength(100)]], 
      Model: ['', Validators.required],
      numberOfSeats: ['', [Validators.required]],
      autonomyInHours: ['', [Validators.required]],
      maxCargo: ['', [Validators.required],]
  });

  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const aircraftData = this.addAircraftForm.value;
    if (this.addAircraftForm.valid) 
      {
      if (this.aircraftId) {
        this.aircraftService.updateItem({ ...aircraftData, id: this.aircraftId });
        }
      else {
        this.aircraftService.addItem(aircraftData);
        }
      }
    }
    
  

      hasError(controlName: string, errorName: string): boolean {
        return this.addAircraftForm.controls[controlName].hasError(errorName) ||
          (this.addAircraftForm.errors && this.addAircraftForm.errors[errorName]);
      }
}
