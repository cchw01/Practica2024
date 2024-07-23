import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { TicketItem } from '../../../app-logic/models/ticket-item';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TicketService } from '../../../app-logic/services/ticket.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ticketsItems: TicketItem[] = [];
  filteredTicketsItems = new MatTableDataSource<TicketItem>(this.ticketsItems);
  filterControl = new FormControl();

  ticketsColumns: string[] = [
    'ticketId',
    'flightNumber',
    'departingAirport',
    'destinationAirport',
    'departingTime',
    'flightTime',
    'flightCost',
    'passenger',
    'checkIn',
    'luggage',
    'action'
  ];

  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    this.loadTickets();
    this.filterControl.valueChanges.subscribe(value => {
      this.applyFilter();
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

  applyFilter() {
    const filterValue = this.filterControl.value || '';
    this.filteredTicketsItems.filter = filterValue.trim().toLowerCase();
  }
  deleteTicket(id: number) {
    if (confirm('Are you sure you want to delete this ticket?')) {
      this.ticketService.deleteTicket(id).subscribe(() => {
        this.loadTickets();
      });
    }
  }
    loadTickets() {
      this.ticketService.getTickets().subscribe(tickets => {
        const now = new Date();
        this.ticketsItems = tickets.filter(ticket => new Date(ticket.flight.departingTime) >= now);
        this.filteredTicketsItems.data = this.ticketsItems;
      });
    }
  
}
