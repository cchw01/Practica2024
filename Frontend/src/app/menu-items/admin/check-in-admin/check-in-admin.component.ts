import { Component, OnInit } from '@angular/core';
import { CheckInService } from '../../../app-logic/services/check-in.service';
import { MatTableDataSource } from '@angular/material/table';
import { CheckInItem, IdDocumentType } from '../../../app-logic/models/checkin-item';
import { Route } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-check-in-admin',
  templateUrl: './check-in-admin.component.html',
  styleUrl: './check-in-admin.component.css'
})
export class CheckInAdminComponent implements OnInit{

  checkInItems: any;

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

  IdDocumentType = IdDocumentType;


  constructor(private checkInService: CheckInService, public dialog: MatDialog){

  }


  ngOnInit(): void {
    this.checkInService.getDataCheckIn().subscribe((data) => {
      this.checkInItems = new MatTableDataSource<CheckInItem>(data);
    });
    this.loadCheckInItems();
  }

  loadCheckInItems(): void {
    this.checkInService.getDataCheckIn().subscribe((data) => {
      this.checkInItems = new MatTableDataSource<CheckInItem>(data);
    });
  }

  deleteCheckIn(id: number): void {
    this.checkInService.deleteCheckIn(id).subscribe(() => {
      this.loadCheckInItems(); // Refresh the table data
    });
  }

  documentTypeOptions = [
    { value: IdDocumentType.IdentityCard, label: 'Identity Card' },
    { value: IdDocumentType.Passport, label: 'Passport' },
    { value: IdDocumentType.DriverLicense, label: 'Driver License' },
  ];


  getDocumentTypeLabel(idDocumentType: IdDocumentType): string {
    const option = this.documentTypeOptions.find(opt => opt.value === idDocumentType);
    return option ? option.label : '';
  }
  
  editCheckIn(id: number): void {
  }
}
