import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TicketItem } from '../models/ticket-item';
import { UserItem } from '../models/user-item';
import { FlightItem } from '../models/flight-item';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
apiUrl = "http://localhost:5198/api/Ticket"
apiUrlF = "http://localhost:5198/api/Flight"
apiUrlU = "http://localhost:5198/api/User"

  constructor(private httpclient:HttpClient) { }
  
  getTickets():Observable< Array<TicketItem>> {
    var ticketList:Array<TicketItem> = new Array;
    return this.httpclient.get<Array<TicketItem>>(this.apiUrl);
  }

  addTicket(item: TicketItem): void {
    var result;
    this.httpclient.post<TicketItem>(this.apiUrl, item).subscribe(data=>{
      result = data;
      console.log(result);
    });
  }

  getTicketId(id:number):Observable< TicketItem> {
    return this.httpclient.get(this.apiUrl + "/" + id) as Observable<TicketItem>;
   }

   updateTicket(item: TicketItem) : void {
    var result;
    this.httpclient.put<TicketItem>(this.apiUrl, item).subscribe(data=>{
      result = data;
      console.log(result);
    });}

    deleteTicket(id: number) :void
    {
      var result;
        this.httpclient.delete<TicketItem>(this.apiUrl+ "/" + id).subscribe(data=>{
          result = data;
          console.log(result);
        });
    }
    
   
    getDataUsers():Observable< Array<UserItem>> {
      var usersList:Array<UserItem> = new Array;
      return this.httpclient.get<Array<UserItem>>(this.apiUrlU);
    }


    getDataFlights():Observable< Array<FlightItem>> {
      var fligtList:Array<FlightItem> = new Array;
      return this.httpclient.get<Array<FlightItem>>(this.apiUrlF);
    }

    getFlightId(id:number):Observable< FlightItem> {
      return this.httpclient.get(this.apiUrlF + "/" + id) as Observable<FlightItem>;
     }
     getUserId(id:number):Observable< UserItem> {
      return this.httpclient.get(this.apiUrlU + "/" + id) as Observable<UserItem>;
     }
} 
