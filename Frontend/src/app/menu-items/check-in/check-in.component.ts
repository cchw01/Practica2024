import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  CheckInItem,
  IdDocumentType,
} from '../../app-logic/models/checkin-item';
import { ActivatedRoute, Router } from '@angular/router';
import { CheckInService } from '../../app-logic/services/check-in.service';
import { TicketItem } from '../../app-logic/models/ticket-item';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { FlightItem } from '../../app-logic/models/flight-item';
import { FlightService } from '../../app-logic/services/flights.service';
import { UserService } from '../../app-logic/services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { CheckInDto } from '../../app-logic/DTOs/check-in-dto';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';



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

  //FLIGHT
  flightData!: FlightItem;

  checkInItemsP: CheckInItem[] = [];

  // editing
  isEditing: boolean = false;

  //id-uri
  checkInId!: number;
  flightId!: number;

  length = 0;

  tableData!: MatTableDataSource<CheckInDto>;

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

  selection = new SelectionModel<CheckInDto>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private fb: FormBuilder,
    private checkInService: CheckInService,
    private flightService : FlightService,
    private activatedRoute: ActivatedRoute
  ) {
    this.tableData = new MatTableDataSource();


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
     // this.updateProgress();
      this.updateQrData();
    });

    this.activatedRoute.params.subscribe((params) => {
      this.checkInId = params['checkInId'] ? +params['checkInId'] : 0;
    });
  }

  ngAfterViewInit(): void {}

  ngOnInit(): void {
    this.loadCheckIns();
    this.itemId = 0;

    this.checkInService.getDataCheckIn().subscribe((data) => {
      this.checkInItems = new MatTableDataSource<CheckInItem>(data);
    });

    

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

    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    const userEmail = userData.emailAddress;

    // Fetch and filter check-in items based on user's email
    this.checkInService.getDataCheckIn().subscribe((data) => {
    this.checkInItems = data.filter((item: CheckInItem) => item.passengerEmail === userEmail);
  });
  }

  loadCheckIns() {
    this.checkInService.getDataCheckIn().subscribe(checkins => {
      this.tableData.data = checkins;
      this.tableData.paginator = this.paginator;
      this.tableData.sort = this.sort;
    });
  }

  deleteCheckIn(id: number) {
    if (confirm('Are you sure you want to delete this discount?')) {
      this.checkInService.deleteCheckIn(id).subscribe(() => {
        this.loadCheckIns();
      });
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.tableData.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.tableData.data.forEach(row => this.selection.select(row));
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



  updateQrData() {
    this.qrData = JSON.stringify(this.form.value);
  }

  generateQrData(element: CheckInItem): string {
    return JSON.stringify({
      ticketId: element.ticketId,
      passengerName: element.passengerName,
      idDocumentType: element.idDocumentType,
      documentData: element.documentData,
      passengerEmail: element.passengerEmail,
      
    });
  }



  generateQrDataTicketId(element: CheckInItem): string {
    return JSON.stringify({
      ticketId: element.ticketId
    });
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
        this.checkInId = ticket.checkInId;
        const flightId = this.ticketData.flightId!;

  
        // Fetch flight information
        this.flightService.getFlight(flightId).subscribe({
          next: (flight) => {
            this.flightData = flight;
            this.ticketData.flight = this.flightData;
  
            // Update QR data to include both ticket and flight information
            this.qrData = JSON.stringify({
               ...this.form.value,
              //ticketData: this.ticketData,
              //flightData: this.flightData,          // add flight data to qr
              ticketId: this.ticketData.ticketId
            });
            this.showQR = true;
  
            if (this.itemId === 0) {
              // Add new check-in
              this.item = new CheckInItem();
              this.item.ticketId = ticketId;
              this.item.passengerName = this.form.value.passengerName;
              this.item.idDocumentType = this.form.value.idDocumentType;
              this.item.documentData = this.form.value.documentData;
              this.item.passengerEmail = this.form.value.passengerEmail;
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
              // Update existing check-in
              this.item = { ...this.item, ...this.form.value, checkInId: this.checkInId };
  
              this.checkInService.updateCheckIn(this.item).subscribe({
                next: (updatedCheckIn) => {
                  console.log('CheckIn updated:', updatedCheckIn);
                  const index = this.checkInItemsP.findIndex((ci) => ci.checkInId === this.itemId);
                  if (index !== -1) {
                    this.checkInItemsP[index] = updatedCheckIn;
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
            console.error('Failed to get flight data:', error);
            alert('Failed to get flight data. Please try again.');
          },
        });
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
      const imgWidth = 220;
      const imgHeight = 300;
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
  
    // Set QR data with the ticket ID
    this.qrData = this.generateQrDataTicketId(checkIn);
    this.showQR = true;
  
    // Fetch related ticket data
    if (checkIn.ticketId !== undefined) {
      this.checkInService.getTicketByIdNou(checkIn.ticketId).subscribe({
        next: (ticket) => {
          this.ticketData = ticket;
  
          if (this.ticketData.flightId !== undefined) {
            // Fetch flight details
            this.flightService.getFlight(this.ticketData.flightId).subscribe({
              next: (flight) => {
                this.flightData = flight;
                this.ticketData.flight = this.flightData;
                this.showQR = true; // Show QR and data
  
                // Patch form with flight details
                this.form.patchValue({
                  flight: {
                    flightNumber: flight.flightNumber,
                    departingAirport: flight.departingAirport.airportName,
                    destinationAirport: flight.destinationAirport.airportName,
                    aircraft: `${flight.aircraft.maker} ${flight.aircraft.model}`,
                    departingTime: flight.departingTime,
                    flightTime: flight.flightTime,
                    flightCost: flight.flightCost,
                    discount: flight.discountOffer?.discountPercentage,
                  }
                });
              },
              error: (error) => {
                console.error('Failed to get flight data:', error);
                alert('Failed to get flight data. Please try again.');
              },
            });
          } else {
            console.error('Flight ID is undefined');
            alert('Flight ID is undefined. Please check the data.');
          }
        },
        error: (error) => {
          console.error('Failed to get ticket data:', error);
          alert('Failed to get ticket data. Please try again.');
        },
      });
    } else {
      console.error('Ticket ID is undefined');
      alert('Ticket ID is undefined. Please check the data.');
    }
  }
}  