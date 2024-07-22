import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { TicketDto } from '../../../../../app-logic/DTOs/ticket-dto';
import { CheckInService } from '../../../../../app-logic/services/check-in.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IdDocumentType } from '../../../../../app-logic/models/checkin-item';
import { CheckInDto } from '../../../../../app-logic/DTOs/check-in-dto';

@Component({
  selector: 'app-add-check-in',
  templateUrl: './add-check-in.component.html',
  styleUrls: ['./add-check-in.component.css']
})
export class AddCheckInComponent implements OnInit {
  addCheckInForm!: FormGroup;
  checkInId!: number;
  ticket$: Observable<TicketDto[]>;

  documentTypeOptions = [
    { value: IdDocumentType.IdentityCard, label: 'Identity Card' },
    { value: IdDocumentType.Passport, label: 'Passport' },
    { value: IdDocumentType.DriverLicense, label: 'Driver License' }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private checkInService: CheckInService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.checkInId = params['id'] ? +params['id'] : 0;
    });

    this.addCheckInForm = this.formBuilder.group({
      ticketId: ['', Validators.required],
      passengerName: ['', Validators.required],
      idDocumentType: ['', Validators.required],
      documentData: ['', Validators.required],
      passengerEmail: ['', [Validators.required, Validators.email]]
    });

    this.ticket$ = this.checkInService.getTickets();
  }

  ngOnInit(): void {
    if (this.checkInId !== 0){
      this.checkInService.getCheckInById(this.checkInId).subscribe(checkin => {
        this.addCheckInForm.patchValue({
          ticketId: checkin.ticketId,
          passengerName: checkin.passengerName,
          idDocumentType: checkin.idDocumentType,
          passengerEmail: checkin.passengerEmail,
          documentData: checkin.documentData
        });
      });
    }
  }

  onSubmit(): void {
    if (this.addCheckInForm.valid) {
      const formValue = this.addCheckInForm.value;
      const checkk: CheckInDto = {
        checkInId: this.checkInId,
        ticketId: formValue.ticketId,
        passengerName: formValue.passengerName,
        idDocumentType: formValue.idDocumentType,
        documentData: formValue.documentData,
        checkInStatus: formValue.checkInStatus,
        passengerEmail: formValue.passengerEmail
      };
  
      if (this.checkInId === 0) {
        this.checkInService.addCheckIn(checkk).subscribe({
          next: () => this.router.navigate(['/admin/check-in']),
          error: err => console.error('Add check-in failed', err)
        });
      } else {
        this.checkInService.updateCheckIn(checkk).subscribe({
          next: () => this.router.navigate(['/admin/check-in']),
          error: err => console.error('Update check-in failed', err)
        });
      }
    }
  }
  

  hasError(controlName: string, errorName: string): boolean {
    return this.addCheckInForm.controls[controlName].hasError(errorName);
  }
}
