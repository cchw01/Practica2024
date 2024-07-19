import { Injectable } from '@angular/core';
import { AircraftItem } from '../models/aircraft-item';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
    
  }
 
}

  


