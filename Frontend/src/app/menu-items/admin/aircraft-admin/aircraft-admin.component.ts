import { SelectionModel } from '@angular/cdk/collections';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AircraftsListMockServices } from '../../../app-logic/services/aircrafts-service';
import { AircraftDto } from '../../../app-logic/DTOs/aircraft-dto';

@Component({
  selector: 'app-aircraft-admin',
  templateUrl: './aircraft-admin.component.html',
  styleUrl: './aircraft-admin.component.css',
})
export class AircraftAdminComponent {
  aircraftData: MatTableDataSource<AircraftDto>;
  aircraftColumns: string[] = [
    'select',
    'AircraftId',
    'registrationNumber',
    'maker',
    'model',
    'numberOfSeats',
    'autonomyInHours',
    'maxCargo',
    'edit',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private aircraftService: AircraftsListMockServices) {
    this.aircraftData = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.loadAircrafts();
  }

  loadAircrafts() {
    this.aircraftService.getData().subscribe((aircrafts) => {
      this.aircraftData.data = aircrafts;
      this.aircraftData.paginator = this.paginator;
      this.aircraftData.sort = this.sort;
    });
  }

  deleteAircraft(id: number) {
    if (confirm('Are you sure you want to delete this aircraft?')) {
      this.aircraftService.deleteItem(id).subscribe(() => {
        this.loadAircrafts();
      });
    }
  }

  // isAllSelected() {
  //   const numSelected = this.selection.selected.length;
  //   const numRows = this.aircraftData.data.length;
  //   return numSelected === numRows;
  // }
}
