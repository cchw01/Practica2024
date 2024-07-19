import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { CheckInItem } from '../../app-logic/models/checkin-item';
import { BookingListMockService } from '../../app-logic/booking-list-mock.service';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.css']
})
export class CheckInComponent implements OnInit {
  isContentVisible = false;
  progress = 0;
  form: FormGroup;
  checkin!: MatTableDataSource<CheckInItem>;
  displayedColumns: string[] = [
    'checkInId',
    'ticket',
    'passengerName',
    'idDocumentType',
    'documentData',
    'checkInStatus',
    'passengerEmail',
  ];
  
  constructor(private fb: FormBuilder, private bookingListMockService: BookingListMockService) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      telefon: ['', Validators.required],
      ticketNumber: ['', Validators.required],
      flightNumber: ['', Validators.required]
    });

    this.form.valueChanges.subscribe(() => {
      this.updateProgress();
    });
  }
  ngOnInit(): void {
    this.checkin = new MatTableDataSource<CheckInItem>(
      this.bookingListMockService.getDataCheckIn()
    );
  }

  toggleContent() {
    this.isContentVisible = !this.isContentVisible;
  }

  updateProgress() {
    const totalFields = Object.keys(this.form.controls).length;
    const filledFields = Object.keys(this.form.controls).filter(
      key => this.form.controls[key].valid
    ).length;
    this.progress = (filledFields / totalFields) * 100;
  }

  onSubmit() {
    if (this.form.valid) {
      // handle form submission
      console.log('Form submitted', this.form.value);
    }
  }
}
