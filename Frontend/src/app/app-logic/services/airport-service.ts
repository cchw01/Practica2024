import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AirportItem } from '../models/airport-item';
import { BaseService } from './base-service';
@Injectable({
  providedIn: 'root',
})
export class AirportListMockService extends BaseService<AirportItem> {
  constructor(httpClient: HttpClient) {
    super(httpClient, "http://localhost:5198/api/Airport");
  }
}
