import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FlightItem } from '../../../app-logic/models/flight-item';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FlightService } from '../../../app-logic/services/flights.service';

@Component({
  selector: 'app-flights-admin',
  templateUrl: './flights-admin.component.html',
  styleUrls: ['./flights-admin.component.css'],
})
export class FlightsAdminComponent {
  flightsData: MatTableDataSource<FlightItem>;
  flightsColumns: string[] = [
    'flightNumber',
    'departingAirportId',
    'destinationAirportId',
    'aircraftId',
    'departingTime',
    'flightTime',
    'flightCost',
    'edit',
  ];

  selection = new SelectionModel<FlightItem>(true, []);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private flightService: FlightService) {
    this.flightsData = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.loadFlights();
  }

  loadFlights() { 
    this.flightService.getFlights().subscribe((flights) => {
      this.flightsData.data = flights;
      this.flightsData.paginator = this.paginator;
      this.flightsData.sort = this.sort;
    });
  }

  deleteFlight(id: number) {
    if (confirm('Are you sure you want to delete this flight?')) {
      this.flightService.deleteFlight(id).subscribe(() => {
        this.loadFlights();
      });
    }
  }
}
