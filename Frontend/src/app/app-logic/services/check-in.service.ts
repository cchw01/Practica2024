import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CheckInDto } from '../DTOs/check-in-dto';
import { CheckInItem } from '../models/checkin-item';
import { TicketDto } from '../DTOs/ticket-dto';

@Injectable({
  providedIn: 'root'
})
export class CheckInService {
  private checkInapiUrl = 'http://localhost:5198/api/CheckIn';
  ticketApiUrl = "http://localhost:5198/api/Ticket"


  constructor(private httpclient: HttpClient) {}

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

  addCheckIn(checkin: CheckInItem) {
    const checkInDto = this.mapCheckInItemToDto(checkin);
    return this.httpclient.post<CheckInDto>(this.checkInapiUrl, checkInDto);
  }

  updateCheckIn(checkin: CheckInDto): Observable<CheckInDto> {
    const checkInDto = this.mapCheckInItemToDto(checkin);
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

  getTickets(): Observable<Array<TicketDto>>{
    return this.httpclient.get<Array<TicketDto>>(this.ticketApiUrl);

  }
}

