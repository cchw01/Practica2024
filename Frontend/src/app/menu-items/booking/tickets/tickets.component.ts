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

 
  ticketsData: MatTableDataSource<TicketItem>;
  filterControl = new FormControl();

  ticketsColumns: string[]=[
    'ticketId',
    'flight.flightNumber',
    'flight.departingAirport.airportName',
    'flight.destinationAirport.airportName',
    'flight.departingTime',
    'flight.flightTime',
    'flight.flightCost',
    'passenger',    
    'checkIn',
    'luggage',
    'delete'
  ]
  constructor(private ticketService:TicketService){
    this.ticketsData = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.loadTickets();
    this.filterControl.valueChanges.subscribe(value => {
      this.ticketsData.filter = value.trim().toLowerCase();
    });

    this.ticketsData.filterPredicate = (data: TicketItem, filter: string) => {
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

  loadTickets() {
    this.ticketService.getTickets().subscribe((tickets) => {
      this.ticketsData.data = tickets;
      this.ticketsData.paginator = this.paginator;
      this.ticketsData.sort = this.sort;

      this.ticketsData.sortingDataAccessor = (item, property) => {
        switch (property) {
          case 'flight.flightNumber':
            return item.flight.flightNumber;
          case 'flight.departingAirport.airportName':
            return item.flight.departingAirport.airportName;
          case 'flight.destinationAirport.airportName':
            return item.flight.destinationAirport.airportName;
          case 'flight.departingTime':
            return new Date(item.flight.departingTime);
          case 'flight.flightTime':
            return item.flight.flightTime;
          case 'passenger':
            return item.passenger.name;
          default:
            return (item as any)[property];
        }
      };
    });
  }

 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.ticketsData.filter = filterValue.trim().toLowerCase();
  }

  deleteTicket(id: number) {
    if (confirm('Are you sure you want to delete this ticket?')) {
      this.ticketService.deleteTicket(id).subscribe(() => {
        this.loadTickets();
      });
    }
  }
}
