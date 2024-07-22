import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { TicketItem } from '../models/ticket-item';
import { FlightItem } from '../models/flight-item';
import { TicketDto } from '../DTOs/ticket-dto';
import { FlightService } from './flights.service';
import { UserService } from './user.service';
import { UserItem } from '../models/user-item';
import { CheckInDto } from '../DTOs/check-in-dto';
import { CheckInItem } from '../models/checkin-item';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
private apiUrl = 'http://localhost:5198/api';
private ticletUrl = "http://localhost:5198/api/Ticket"

  constructor(private http:HttpClient,private flightService:FlightService,private userService:UserService) {}
  
  private mapFlight(item:FlightItem):FlightItem{
    return new FlightItem({
      
      flightNumber: item.flightNumber,
      departingAirport: item.departingAirport,
      destinationAirport: item.destinationAirport,
      departingTime: item.departingTime,
      flightTime: item.flightTime,
      aircraft: item.aircraft,
      flightCost: item.flightCost,
      discountOffer: item.discountOffer ?? undefined
    });
  }
  private mapUser(item:UserItem):UserItem{
    return new UserItem({
      userId: item.userId,
      name: item.name,
      role: item.role,
      emailAddress: item.emailAddress,
      password: item.password,
      ticketList: item.ticketList ?? undefined
    })
  }
  // private mapCheckInDtoToCheckInItem(dto:CheckInDto):CheckInItem{
  //   return new CheckInItem({
  //     checkInId: dto.checkInId,
  //     ticket: this.getTicket(dto.ticketId),
  //     passengerName: dto.passengerName,
  //     idDocumentType: dto.idDocumentType,
  //     documentData: dto.documentData,
  //     checkInStatus: dto.checkInStatus,
  //     passengerEmail: dto.passengerEmail 
  //   });
  // }

  getTickets(): Observable<TicketItem[]>{
    return this.http.get<TicketDto[]>(`${this.apiUrl}/Ticket`).pipe(
      switchMap((ticketDtos)=>{
        if(ticketDtos.length===0) return of([]);
        return forkJoin(
          ticketDtos.map((ticketDto)=>
            forkJoin({
              flightT: this.flightService.getFlight(
                ticketDto.flightId
              ).pipe(map(this.mapFlight)),
             passagerT: this.userService.getUserById(
              ticketDto.userId
             ).pipe(map(this.mapUser)),
            //  checkInT: ticketDto.checkInId
            //  ? this.http
            //       .get<CheckInDto>(
            //          `${this.apiUrl}/CheckIn/${ticketDto.checkInId}`
            //       )
            //       .pipe(map(this.mapCheckInDtoToCheckInItem))
            //   : of(null),
            }).pipe(
              map(
                ({ flightT, passagerT}) =>
                  new TicketItem({
                    ...ticketDto,
                    flight: flightT,
                    passager: passagerT,
               })
            )
          )
        )
        );
      })
    );
  }

  getTicket(ticketId:number):Observable<TicketItem>{
    return this.http
      .get<TicketDto>(`${this.apiUrl}/Ticket/${ticketId}`)
      .pipe(
        switchMap((ticketDto)=>{
          const flightT = this.flightService.getFlight(ticketDto.flightId)
          .pipe(map(this.mapFlight));
          const passagerT = this.userService.getUserById(ticketDto.userId)
          .pipe(map(this.mapUser));
          return forkJoin({flightT,passagerT}).pipe(
            map(
              ({flightT,passagerT})=>
                new TicketItem({
                  ...ticketDto,
                  flight: flightT,
                  passager: passagerT
                })
            )
          )
        })
      )

  }

  addTicket(ticket:TicketDto): Observable<TicketItem>{
    const ticketDto: TicketDto = {
      ticketId: ticket.ticketId,
      flightId: ticket.flightId,
      userId: ticket.userId,
      checkInId: ticket.checkInId ?? undefined,
      luggage: ticket.luggage,
      price: ticket.price
    }
    return this.http
    .post<TicketDto>(`${this.apiUrl}/Ticket`, ticketDto)
    .pipe(
      switchMap((returnedTicketDto)=>
        this.getTicket(returnedTicketDto.ticketId)
      )
    );
  }

  updateTicket(ticket:TicketDto): Observable<TicketItem>{
    const ticketDto: TicketDto = {
      ticketId: ticket.ticketId,
      flightId: ticket.flightId,
      userId: ticket.userId,
      checkInId: ticket.checkInId ?? undefined,
      luggage: ticket.luggage,
      price: ticket.price
    }
    return this.http
    .put<TicketDto>(`${this.apiUrl}/Ticket/${ticket.ticketId}`, ticketDto)
      .pipe(switchMap(() => this.getTicket(ticket.ticketId)));
  }

  deleteTicket(ticketId:number): Observable<any>{
    return this.http.delete(`${this.apiUrl}/Ticket/${ticketId}`);
  }

} 
