import { Component, OnInit, ViewChild } from '@angular/core';
import { TicketItem } from '../../../app-logic/models/ticket-item';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TicketService } from '../../../app-logic/services/ticket.service';

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
    'delete'
  ]
  constructor(private ticketService:TicketService){}

  ngOnInit(): void {
    this.ticketService.getTickets().subscribe(tickets => {
      this.ticketsItems = tickets;
      this.filteredTicketsItems.data = this.ticketsItems;
    });
    this.filteredTicketsItems.data = this.ticketsItems;
    this.filterControl.valueChanges.subscribe(value => {
      this.filteredTicketsItems.filter = value.trim().toLowerCase();
    });

    this.filteredTicketsItems.filterPredicate = (data: TicketItem, filter: string) => {
      const searchTerms = filter.split(' ');
      return searchTerms.every(term => 
        data.ticketId.toString().includes(term) ||
        data.flight.flightNumber.toString().includes(term) ||
        data.flight.departingAirport.airportName.toLowerCase().includes(term) ||
        data.flight.destinationAirport.airportName.toLowerCase().includes(term) ||
        new Date(data.flight.departingTime).toLocaleString().toLowerCase().includes(term) ||
        data.flight.flightTime.toString().includes(term) ||
        data.passenger.name.toLowerCase().includes(term) ||
        data.passenger.emailAddress.toLowerCase().includes(term)
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

  deleteTicket(id: number) {
    if (confirm('Are you sure you want to delete this flight?')) {
      this.ticketService.deleteTicket(id).subscribe(() => { 
        this.ticketsItems = this.ticketsItems.filter(ticket => ticket.ticketId !== id);
        this.filteredTicketsItems.data = this.ticketsItems;

    });
  }
}
}
