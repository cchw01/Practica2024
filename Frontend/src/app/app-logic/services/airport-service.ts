import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AirportItem } from '../models/airport-item';

@Injectable({
  providedIn: 'root',
})
export class AirportListMockService {

  apiUrl="http://localhost:5198/api/Airport";

  airportsData: Array<AirportItem> = [
    {
      airportId: 0    ,
      airportName: '',
      location: '',
    },
    {
      airportId: 1,
      airportName: 'AeroportA',
      location: 'LocatiaA',
    },
    {
      airportId: 2,
      airportName: 'AeroportB',
      location: 'LocatiaB',
    },
    {
      airportId: 3,
      airportName: 'AeroportC',
      location: 'LocatiaC',
    },
    {
      airportId: 4,
      airportName: 'AeroportD',
      location: 'LocatiaD',
    },
  ];
  constructor(private httpclient:HttpClient) {}
  getDataAirports():Observable<Array<AirportItem>> {
    return this.httpclient.get<Array<AirportItem>>(this.apiUrl);
  }


  addItem(item: AirportItem): void {
    var result;
    this.httpclient.post<AirportItem>(this.apiUrl, item).subscribe(data=>{
      result = data;
      console.log(result);
    });
  }

  updateItem(item: AirportItem): void {
    var result;
    this.httpclient.put<AirportItem>(this.apiUrl, item).subscribe(data=>{
      result = data;
      console.log(result);
    });
  }

  getLastId(): number {
    return Math.max.apply(
      Math,
      this.airportsData.map(function (o) {
        return o.airportId;
      })
    );
  }
  deleteItem(id:number):Observable<AirportItem>{
    return this.httpclient.delete<AirportItem>(this.apiUrl+"/"+id);
  }

  getItemById(id: number):Observable<AirportItem> {
    return this.httpclient.get<AirportItem>(this.apiUrl+"/getbyid/"+ id);
    




  }
}
