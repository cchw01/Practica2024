import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { TicketItem } from '../models/ticket-item';
import { UserItem } from '../models/user-item';
import { FlightItem } from '../models/flight-item';
import { AirportItem } from '../models/airport-item';
import { FlightDto } from '../DTOs/flight-dto';
import { AircraftComponent } from '../../menu-items/aircraft-list/aircraft-list.component';
import { AircraftItem } from '../models/aircraft-item';
import { DiscountItem } from '../models/discount-item';
import { UserDto } from '../DTOs/user-dto';
import { DiscountDto } from '../DTOs/discount-dto';
import { TicketDto } from '../DTOs/ticket-dto';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
apiUrlT = "http://localhost:5198/api/Ticket"
apiUrlF = "http://localhost:5198/api/Flight"
apiUrlU = "http://localhost:5198/api/User"
apiUrlA = "http://localhost:5198/api/Airport"
apiUrlD = "http://localhost:5198/api/Discount"


  constructor(private httpClient:HttpClient) { }
  
  getTickets():Observable< Array<TicketItem>> {
    var ticketList:Array<TicketItem> = new Array;
    return this.httpClient.get<Array<TicketItem>>(this.apiUrlT);
  }
  addTicket(item: TicketItem): void {
    var result;
    this.httpClient.post<TicketItem>(this.apiUrlT, item).subscribe(data=>{
      result = data;
      console.log(result);
    });
  }
  // addTicket(item: TicketDto): Observable<TicketDto> {
  //   return this.httpClient.post<TicketDto>(this.apiUrlT, item);
  // }
  // getTicketId(id:number):Observable< TicketItem> {
  //   return this.httpClient.get(this.apiUrlT + "/" + id) as Observable<TicketItem>;
  //  }
   getTicketId(id: number): Observable<TicketItem> {
    return this.httpClient.get<TicketDto>(`${this.apiUrlF}/${id}`).pipe(
      map(dto => new TicketItem(dto))
    );
  }
   updateTicket(item: TicketItem) : void {
    var result;
    this.httpClient.put<TicketItem>(this.apiUrlT, item).subscribe(data=>{
      result = data;
      console.log(result);
    });}

    deleteTicket(id: number) :void
    {
      var result;
        this.httpClient.delete<TicketItem>(this.apiUrlT+ "/" + id).subscribe(data=>{
          result = data;
          console.log(result);
        });
    }
    getAirportId(id:number):Observable< AirportItem> {
      return this.httpClient.get(this.apiUrlA + "/" + id) as Observable<AirportItem>;
    }
    getDataFlights(): Observable<FlightItem[]> {
      return this.httpClient.get<FlightDto[]>(this.apiUrlF).pipe(
        map(flightsDto => flightsDto.map(dto => this.mapFlightDtoToFlightItem(dto)))
      );
    }
    getFlightId(id: number): Observable<FlightItem> {
      return this.httpClient.get<FlightDto>(`${this.apiUrlF}/${id}`).pipe(
        map(dto => this.mapFlightDtoToFlightItem(dto))
      );
    }
    getUserId(id: number): Observable<UserItem> {
      return this.httpClient.get<UserDto>(`${this.apiUrlU}/${id}`).pipe(
        map(dto => new UserItem(dto))
      );
    }
    // getDataAircrafts():Observable< Array<AircraftItem>> {
    //   var usersList:Array<AircraftItem> = new Array;
    //   return this.httpClient.get<Array<AircraftItem>>(this.apiUrlAC);
    // }

    getDiscountId(id: number): Observable<DiscountItem> {
      return this.httpClient.get<DiscountDto>(`${this.apiUrlD}/${id}`).pipe(
        map(dto => new DiscountItem(dto))
      );
    }
    private mapFlightDtoToFlightItem(dto: FlightDto): FlightItem {
          // Calculate flight time in minutes
          const departingTime = new Date(dto.departingTime);
          const arrivalTime = new Date(dto.flightTime);
          const flightDurationInMinutes = (arrivalTime.getTime() - departingTime.getTime()) / (1000 * 60);
      return {
        flightNumber: dto.flightNumber,
        departingAirport: { airportId: dto.departingAirportId } as AirportItem,
        destinationAirport: { airportId: dto.destinationAirportId } as AirportItem,
        departingTime: departingTime,
        flightTime: flightDurationInMinutes,
        aircraft: { aircraftId: dto.aircraftId } as any, // Adjust as necessary for your AircraftItem model
        flightCost: dto.flightCost,
        discountOffer: dto.discountId ? { discountId: dto.discountId } as DiscountItem : undefined ,
        departingAirportId: dto.departingAirportId,
        destinationAirportId: dto.destinationAirportId,
        aircraftId: dto.aircraftId,
        discountOfferId: dto.discountId
      };
    }   
} 