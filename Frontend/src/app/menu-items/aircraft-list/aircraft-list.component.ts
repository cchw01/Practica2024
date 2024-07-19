
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild, viewChild } from '@angular/core';
import { AircraftsListMockServices } from '../../app-logic/services/aircrafts-service';
import { AircraftItem } from '../../app-logic/models/aircraft-item';


@Component({
  selector: 'app-aircraft',
  templateUrl: './aircraft-list.component.html',
  styleUrl: './aircraft-list.component.css'
})
export class AircraftComponent {
  @ViewChild(MatPaginator, { static: true }) paginator:
 | MatPaginator
 | undefined;


@ViewChild(MatSort, { static: true }) sort?: MatSort;
aircraft: any;
aircraftColumns: string[] = [
  
  'registrationNumber',
  'maker',
  'model',
  'numberOfSeats',
  'autonomyInHours',
  'maxCargo',
  
];
selection = new SelectionModel<Element>(true, []);
constructor(private aircraftListMockServices: AircraftsListMockServices) {}

  ngOnInit(): void {
    this.aircraftListMockServices.getData().subscribe((data: AircraftItem[]) => {
      this.aircraft = new MatTableDataSource<AircraftItem>(data);
      this.aircraft.paginator = this.paginator;
      this.aircraft.sort = this.sort;
    });
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.aircraft.data.forEach((row: Element) => {
          this.selection.select(row);
        });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.aircraft.data.length;
    return numSelected === numRows;
  }
}

