import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { TicketItem } from '../models/ticket-item';
import { FlightItem } from '../models/flight-item';
import { TicketDto } from '../DTOs/ticket-dto';
import { FlightService } from './flights.service';
import { UserService } from './user.service';
import { UserItem } from '../models/user-item';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
private apiUrl = "http://localhost:5198/api/Ticket"

  
    constructor(
      private http: HttpClient,
      private userService: UserService,
      private flightService: FlightService
    ) {}
  
    getTickets(): Observable<TicketItem[]> {
      return this.http.get<TicketDto[]>(this.apiUrl).pipe(
        switchMap((ticketDtos) => {
          if (ticketDtos.length === 0) return [];
          return forkJoin(
            ticketDtos.map((ticketDto) =>
              forkJoin({
                flight: this.flightService.getFlight(ticketDto.flightId),
                passenger: this.userService.getUserById(ticketDto.userId)
              }).pipe(
                map(({ flight, passenger }) =>
                  new TicketItem({
                    ...ticketDto,
                    flight: flight,
                    passenger: passenger
                  })
                )
              )
            )
          );
        })
      );
    }
  
    getTicketById(ticketId: number): Observable<TicketItem> {
      return this.http.get<TicketDto>(`${this.apiUrl}/${ticketId}`).pipe(
        switchMap((ticketDto) =>
          forkJoin({
            flight: this.flightService.getFlight(ticketDto.flightId),
            passenger: this.userService.getUserById(ticketDto.userId)
          }).pipe(
            map(({ flight, passenger }) =>
              new TicketItem({
                ...ticketDto,
                flight: flight,
                passenger: passenger
              })
            )
          )
        )
      );
    }

    
  
    addTicket(ticket: TicketItem): Observable<void> {
      const ticketDto: TicketDto = {
        ticketId: 0, 
        flightId: ticket.flight.flightNumber,
        userId: ticket.passenger.userId,
        checkInId: ticket.checkInId,
        luggage: ticket.luggage,
        price: ticket.price
      };
      return this.http.post<void>(this.apiUrl, ticketDto);
    }
  
    updateTicket(ticket: TicketItem): Observable<TicketItem> {
      const ticketDto: TicketDto = {
        ...ticket, 
        flightId: ticket.flight.flightNumber,
        userId: ticket.passenger.userId
      };
      return this.http.put<TicketDto>(`${this.apiUrl}`, ticketDto).pipe(
        switchMap(() => this.getTicketById(ticket.ticketId))
      );
    }
  
    deleteTicket(ticketId: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${ticketId}`);
    }


}