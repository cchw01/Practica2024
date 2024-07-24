import { Injectable } from '@angular/core';
import { AircraftItem } from '../models/aircraft-item';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AircraftsListMockServices {
  apiUrl = "http://localhost:5198/api/Aircraft";
    
  constructor(private httpclient:HttpClient){}

  getData():Observable<Array<AircraftItem>> {
    return this.httpclient.get<Array<AircraftItem>>(this.apiUrl);
  }
  
  addItem(item: AircraftItem) {
    this.httpclient.post<AircraftItem>(this.apiUrl, item).subscribe(data => {
      console.log('Added Aircraft:', data);
    });
  }

  updateItem(item: AircraftItem): void {
    this.httpclient.put<AircraftItem>(this.apiUrl, item).subscribe(data => { console.log("Updated Aircraft:",data)});
  }

  deleteItem(id: number): Observable<AircraftItem> {
    return this.httpclient.delete<AircraftItem>(`${this.apiUrl}/${id}`);
  }

  getItemById(id: number): Observable<AircraftItem> {
    return this.httpclient.get<AircraftItem>(`${this.apiUrl}/${id}`);
  }

}

  


