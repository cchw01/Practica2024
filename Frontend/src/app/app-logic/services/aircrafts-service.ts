import { Injectable } from '@angular/core';
import { AircraftItem } from '../models/aircraft-item';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { BaseService } from './base-service';
@Injectable({
  providedIn: 'root'
})
export class AircraftsListMockServices extends BaseService<AircraftItem> {
  constructor(httpClient: HttpClient) {
    super(httpClient, "http://localhost:5198/api/Aircraft");
  }

}

  


