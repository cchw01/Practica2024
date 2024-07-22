import { Component, OnInit, ViewChild } from '@angular/core';
import { TicketItem } from '../../../app-logic/models/ticket-item';
import { BookingListMockService } from '../../../app-logic/booking-list-mock.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.css'
})
export class TicketsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

 ticketsItems: TicketItem[] = [];
 
  filteredTicketsItems = new MatTableDataSource<TicketItem>(this.ticketsItems);
  filterControl = new FormControl();


  ticketsColumns: string[]=[
    'tickedId',
    'flight.flightNumber',
    'flight.departingAirport.airportName',
    'flight.destinationAirport.airportName',
    'flight.departingTime',
    'flight.flightTime',
    'flight.flightCost',
    'passager',    
    'checkIn',
    'luggage',
  ]
  constructor(private bookingListMockService:BookingListMockService){}
  ngOnInit(): void {
    this.ticketsItems = this.bookingListMockService.getDataTickets();
    this.filteredTicketsItems.data = this.ticketsItems;
    this.filterControl.valueChanges.subscribe(value => {
      this.filteredTicketsItems.filter = value.trim().toLowerCase();
    });

    this.filteredTicketsItems.filterPredicate = (data: TicketItem, filter: string) => {
      const searchTerms = filter.split(' ');
      return searchTerms.every(term => 
        data.tickedId.toString().includes(term) ||
        data.flight.flightNumber.toString().includes(term) ||
        data.flight.departingAirport.airportName.toLowerCase().includes(term) ||
        data.flight.destinationAirport.airportName.toLowerCase().includes(term) ||
        new Date(data.flight.departingTime).toLocaleString().toLowerCase().includes(term) ||
        data.flight.flightTime.toString().includes(term) ||
        data.passager.name.toLowerCase().includes(term) ||
        data.passager.emailAddress.toLowerCase().includes(term)
      );
    };
  }

  ngAfterViewInit() {
    this.filteredTicketsItems.paginator = this.paginator;
    this.filteredTicketsItems.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filteredTicketsItems.filter = filterValue.trim().toLowerCase();
  }
}