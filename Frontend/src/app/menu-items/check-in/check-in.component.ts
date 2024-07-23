import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import {
  CheckInItem,
  IdDocumentType,
} from '../../app-logic/models/checkin-item';
import { ActivatedRoute, Router } from '@angular/router';
import { CheckInService } from '../../app-logic/services/check-in.service';
import { TicketItem } from '../../app-logic/models/ticket-item';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.css'],
})
export class CheckInComponent implements OnInit, AfterViewInit {
  isOnlineContentVisible = false;
  isQRContentVisible = false;

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

  //ticket
  ticketData!: TicketItem; 

  checkInItemsP: CheckInItem[] = [];

  isEditing: boolean = false;

  checkInId!: number;


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
    private router: Router,
    private cdr: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute
  ) {
    // evidenta 
    this.checkInService.getDataCheckIn().subscribe((data) => {
      this.checkInItems = data; 
    });
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

    this.activatedRoute.params.subscribe((params) => {
      this.checkInId = params['checkInId'] ? +params['checkInId'] : 0;
    });
  }

  ngAfterViewInit(): void {}

  ngOnInit(): void {
    this.itemId = 0;



    

    if (this.itemId != 0) {
      this.isEditing = true; // Set to true when editing
      this.checkInService.getCheckInById(this.itemId).subscribe((data) => {
        this.item = data;
        console.log(this.item);
        this.InitForm();
      });
    } else {
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

  toggleContent(contentType: string) {
    this.isOnlineContentVisible = contentType === 'online' ? !this.isOnlineContentVisible : false;
    this.isQRContentVisible = contentType === 'qr' ? !this.isQRContentVisible : false;
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
    const ticketId = this.form.value.ticketId;
  
    this.checkInService.getTicketByIdNou(ticketId).subscribe({
      next: (ticket) => {
        this.ticketData = ticket;
        this.checkInId=ticket.checkInId;
        this.qrData = JSON.stringify({
          ...this.form.value,
          ticketData: this.ticketData,
        });
        this.showQR = true;
  
        if (this.itemId == 0) {
          // Adaugare nou check-in
          this.item = new CheckInItem(this.form.value);
          this.item.checkInStatus = true;
  
          this.checkInService.addCheckIn(this.item).subscribe({
            next: (checkIN) => {
              console.log('CheckIn added:', checkIN);
              this.checkInItems.push(checkIN);
            },
            error: (error) => {
              console.error('Registration failed:', error);
              alert('Registration failed. Please try again.');
            },
          });
        } else {
          // Actualizare check-in existent
          this.item = { ...this.item, ...this.form.value, checkInId: this.checkInId  };
  
          this.checkInService.updateCheckIn(this.item).subscribe({
            next: (updatedCheckIn) => {
              console.log('CheckIn updated:', updatedCheckIn);
              const index = this.checkInItemsP.findIndex((ci: CheckInItem) => ci.checkInId === this.itemId);
              if (index !== -1) {
                this.checkInItemsP[index] = updatedCheckIn;
                this.cdr.detectChanges();
              }
            },
            error: (error) => {
              console.error('Update failed:', error);
              alert('Update failed. Please try again.');
            },
          });
        }
      },
      error: (error) => {
        console.error('Failed to get ticket data:', error);
        alert('Failed to get ticket data. Please try again.');
      },
    });
  }

  generatePDF() {
    console.log('generatePDF called');
    const data = document.getElementById('pdfContent');
    console.log('PDF content element:', data);
  
    if (!data) {
      console.error('Element with id "pdfContent" not found.');
      return;
    }
  
    html2canvas(data).then((canvas) => {
      const imgWidth = 50;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('CheckInDetails.pdf');
    });
  }

  editCheckIn(checkIn: CheckInItem) {
    this.itemId = checkIn.checkInId; 
    this.isEditing = true; // Set to true when editing
    this.form.patchValue({
      ticketId: checkIn.ticketId,
      passengerName: checkIn.passengerName,
      idDocumentType: checkIn.idDocumentType,
      documentData: checkIn.documentData,
      passengerEmail: checkIn.passengerEmail,
    });
    this.showQR = false; // Ascundem QR-ul pentru edit
  }

  
  
}