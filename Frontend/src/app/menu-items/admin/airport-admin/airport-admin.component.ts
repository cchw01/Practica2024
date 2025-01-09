import { SelectionModel } from '@angular/cdk/collections';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AirportDto } from '../../../app-logic/DTOs/airport-dto';
import { AirportListMockService } from '../../../app-logic/services/airport-service';

@Component({
  selector: 'app-airport-admin',
  templateUrl: './airport-admin.component.html',
  styleUrl: './airport-admin.component.css'
})
export class AirportAdminComponent {
  airportData: MatTableDataSource<AirportDto>;
  airportColumns: string[] = [
    'select',
    'airportId',
    'location',
    'airportName',
    'edit',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private airportService: AirportListMockService) {
    this.airportData = new MatTableDataSource();
  }

  ngOnInit(): void {
    console.time('Page Load Time');
    this.loadAirports();
  }

  loadAirports() {
    console.time('Data Fetch Time');
    this.airportService.getDataAirports().subscribe(aircrafts => {
      this.airportData.data = aircrafts;
      this.airportData.paginator = this.paginator;
      this.airportData.sort = this.sort;
      console.timeEnd('Data Fetch Time');
      console.timeEnd('Page Load Time');
    });
  }

  deleteAirport(id: number) {
    if (confirm('Are you sure you want to delete this airport?')) {
      this.airportService.deleteItem(id).subscribe(() => {
        this.loadAirports();
      });
    }
  }

  

}
