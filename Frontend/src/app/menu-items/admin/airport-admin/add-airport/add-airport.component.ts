import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatButton } from '@angular/material/button';
import { SelectionModel } from '@angular/cdk/collections';
import { AircraftDto } from '../../../../app-logic/DTOs/aircraft-dto';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AirportListMockService } from '../../../../app-logic/services/airport-service';

@Component({
  selector: 'app-add-airport',
  templateUrl: './add-airport.component.html',
  styleUrl: './add-airport.component.css'
})
export class AddAirportComponent implements OnInit {
  addAirportForm!: FormGroup;
  airportId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private airportService: AirportListMockService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.airportId = params['airportId'] ? + params['airportId'] : 0;
    });

    this.addAirportForm = this.formBuilder.group({
      airportName: ['', Validators.required],
      location: ['', [Validators.required,]]});

  }

  ngOnInit(): void {
    if (this.airportId !== 0) {
      this.airportService.getItemById(this.airportId).subscribe((airport) => {
        this.addAirportForm.patchValue({
          airportName: airport.airportName,
          location: airport.location
        });
      });
    }
  }

  onSubmit(): void {
    const aircraftData = this.addAirportForm.value;
    if (this.addAirportForm.valid) 
      {
      if (this.airportId) 
        {
        const updatedAirportData = 
        {
          ...aircraftData,
          airportId: this.airportId
        };
        this.airportService.updateItem(updatedAirportData);
        this.router.navigate(['/admin/airport']);
        }
      else 
      {
        this.airportService.addItem(aircraftData);
        this.router.navigate(['/admin/airport']);
      }
      }
    }

      hasError(controlName: string, errorName: string): boolean {
        return this.addAirportForm.controls[controlName].hasError(errorName) ||
          (this.addAirportForm.errors && this.addAirportForm.errors[errorName]);
      }






}
