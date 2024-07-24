import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CheckInDto } from '../DTOs/check-in-dto';
import { CheckInItem } from '../models/checkin-item';
import { TicketDto } from '../DTOs/ticket-dto';
import { TicketItem } from '../models/ticket-item';
import { FlightService } from './flights.service';
import { UserService } from './user.service';
import { FlightDto } from '../DTOs/flight-dto';

@Injectable({
  providedIn: 'root'
})
export class CheckInService {
  private checkInapiUrl = 'http://localhost:5198/api/CheckIn';
  ticketApiUrl = "http://localhost:5198/api/Ticket"
  flightApiUrl = "http://localhost:5198/api/Flight"


  constructor(private httpclient: HttpClient, private flightService: FlightService, private userService: UserService) {}


  //chestii de flight vedemd aca merg
  getFlight(flightId: number): Observable<FlightDto> {
    return this.httpclient.get<FlightDto>(`${this.flightApiUrl}/${flightId}`);
  }

  //

  
  getDataCheckIn(): Observable<CheckInItem[]> {
    return this.httpclient.get<CheckInDto[]>(this.checkInapiUrl).pipe(
      map(checkInDtos => checkInDtos.map(dto => this.mapCheckInDtoToItem(dto)))
    );
  }

  getCheckInById(id: number): Observable<CheckInItem> {
    return this.httpclient.get<CheckInDto>(`${this.checkInapiUrl}/${id}`).pipe(
      map(dto => this.mapCheckInDtoToItem(dto))
    );
  }

  getTicketByIdNou(ticketId: number): Observable<TicketItem> {
    return this.httpclient.get<TicketDto>(`${this.ticketApiUrl}/${ticketId}`).pipe(
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

  addCheckIn(checkin: CheckInItem) {
    const checkInDto = this.mapCheckInItemToDto(checkin);
    return this.httpclient.post<CheckInDto>(this.checkInapiUrl, checkInDto);
  }

  updateCheckIn(checkin: CheckInDto): Observable<CheckInDto> {
    const checkInDto = this.mapCheckInItemToDtoUpdate(checkin);
    return this.httpclient.put<CheckInDto>(this.checkInapiUrl, checkInDto);
  }
  
  


  deleteCheckIn(id: number) {
    return this.httpclient.delete<void>(`${this.checkInapiUrl}/${id}`);
  }

  private mapCheckInDtoToItem(dto: CheckInDto): CheckInItem {
    return {
      checkInId: dto.checkInId,
      ticketId: dto.ticketId,
      passengerName: dto.passengerName,
      idDocumentType: dto.idDocumentType,
      documentData: dto.documentData,
      checkInStatus: dto.checkInStatus,
      passengerEmail: dto.passengerEmail
    };
  }

  private mapCheckInItemToDto(item: CheckInItem): CheckInDto {
    return {
      checkInId: 0,
      ticketId: item.ticketId,
      passengerName: item.passengerName,
      idDocumentType: item.idDocumentType,
      documentData: item.documentData,
      checkInStatus: item.checkInStatus,
      passengerEmail: item.passengerEmail
    };
  }

  
  private mapCheckInItemToDtoUpdate(item: CheckInItem): CheckInDto {
    return {
      checkInId: item.checkInId,
      ticketId: item.ticketId,
      passengerName: item.passengerName,
      idDocumentType: item.idDocumentType,
      documentData: item.documentData,
      checkInStatus: item.checkInStatus,
      passengerEmail: item.passengerEmail
    };
  }

  getTickets(): Observable<Array<TicketDto>>{
    return this.httpclient.get<Array<TicketDto>>(this.ticketApiUrl);

  }


}