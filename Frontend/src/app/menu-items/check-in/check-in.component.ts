import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import {
  CheckInItem,
  IdDocumentType,
} from '../../app-logic/models/checkin-item';
import { ActivatedRoute, Router } from '@angular/router';
import { CheckInService } from '../../app-logic/services/check-in.service';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.css'],
})
export class CheckInComponent implements OnInit, AfterViewInit {
  isContentVisible = false;
  progress = 0;
  checkInItems: any;

  IdDocumentType = IdDocumentType; // Enum-ul original

  form: FormGroup;
  item!: CheckInItem;
  itemId!: number;

  //QR
  qrData: string = '';
  showQR: boolean = false;



  documentTypeOptions = [
    { value: IdDocumentType.IdentityCard, label: 'Identity Card' },
    { value: IdDocumentType.Passport, label: 'Passport' },
    { value: IdDocumentType.DriverLicense, label: 'Driver License' },
  ];

  checkinColumns: string[] = [
    'checkInId',
    'ticket',
    'passengerName',
    'idDocumentType',
    'documentData',
    'checkInStatus',
    'passengerEmail',
    'action',
  ];

  constructor(
    private fb: FormBuilder,
    private checkInService: CheckInService,
    private router: Router
  ) {
    this.form = this.fb.group({
      ticket: ['', Validators.required],
      passengerName: ['', Validators.required],
      idDocumentType: ['', Validators.required],
      documentData: ['', Validators.required],
      passengerEmail: ['', Validators.required],
    });

    this.form.valueChanges.subscribe(() => {
      this.updateProgress();
      this.updateQrData();
    });
  }

  ngAfterViewInit(): void {}

  ngOnInit(): void {
    this.itemId = 0;

    this.checkInService.getDataCheckIn().subscribe((data) => {
      this.checkInItems = new MatTableDataSource<CheckInItem>(data);
    });

    if (this.itemId != 0)
      this.checkInService.getCheckInById(this.itemId).subscribe((data) => {
        this.item = data;
        console.log(this.item);
        this.InitForm();
      });
    else {
      this.item = new CheckInItem();
      this.InitForm();
    }
  }

  private InitForm() {
    this.form = this.fb.group({
      ticketId: [this.item.ticketId, Validators.required],
      passengerName: [this.item.passengerName, Validators.maxLength(100)],
      idDocumentType: [this.item.idDocumentType, Validators.required],
      documentData: [this.item.documentData, Validators.required],
      passengerEmail: [this.item.passengerEmail, Validators.required],
    });
  }

  toggleContent() {
    this.isContentVisible = !this.isContentVisible;
  }

  updateProgress() {
    const totalFields = Object.keys(this.form.controls).length;
    const filledFields = Object.keys(this.form.controls).filter(
      (key) => this.form.controls[key].valid
    ).length;
    this.progress = (filledFields / totalFields) * 100;
  }

  updateQrData() {
    this.qrData = JSON.stringify(this.form.value);
  }


  getDocumentTypeLabel(idDocumentType: IdDocumentType): string {
    const option = this.documentTypeOptions.find(
      (opt) => opt.value === idDocumentType
    );
    return option ? option.label : '';
  }

  onSubmit() {
    this.qrData = JSON.stringify(this.form.value)
    this.showQR = true;
    if (this.itemId == 0) {
      this.item = new CheckInItem(this.form.value);
      this.item.checkInStatus = true;
      //this.item.id = this.inventoryListMockService.getLastId() + 1;
      this.checkInService.addCheckIn(this.item).subscribe({
        next: (checkIN) => {
          console.log('CheckIn added:', checkIN);
         // this.router.navigate(['/check-in']);
        },
        error: (error) => {
          console.error('Registration failed:', error);
          alert('Registration failed. Please try again.');
        },
      });
    } else {
      this.item.passengerName = this.form.value.passengerName;
      this.item.idDocumentType = this.form.value.idDocumentType;
      this.item.documentData = this.form.value.documentData;
      this.item.passengerEmail = this.form.value.passengerEmail;
      //this.checkInService.updateCheckIn(this.item);
    }
    //this.router.navigate(['/']);
  }

}