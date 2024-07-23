import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DiscountDto } from '../DTOs/discount-dto';
import { FlightDto } from '../DTOs/flight-dto';
import { DiscountItem } from '../models/discount-item';

@Injectable({
  providedIn: 'root',
})
export class DiscountService {
  apiUrl = 'http://localhost:5198/api/Discount';
  flightApiUrl = 'http://localhost:5198/api/Flight';

  constructor(private httpClient: HttpClient) {}

  getDiscounts(): Observable<Array<DiscountItem>> {
    return this.httpClient.get<Array<DiscountItem>>(this.apiUrl);
  }

  addDiscount(discount: DiscountDto): Observable<DiscountDto> {
    return this.httpClient.post<DiscountDto>(this.apiUrl, discount);
  }

  updateDiscount(discount: DiscountDto): Observable<DiscountDto> {
    const url = `${this.apiUrl}/${discount.discountId}`;
    return this.httpClient.put<DiscountDto>(url, discount);
  }

  deleteDiscount(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.delete<void>(url);
  }

  getLastId(): Observable<number> {
    return this.getDiscounts().pipe(
      map((discounts: DiscountDto[]) =>
        Math.max(0, ...discounts.map((d) => d.discountId))
      )
    );
  }

  getDiscountById(id: number): Observable<DiscountDto> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.get<DiscountDto>(url);
  }

  // This method will later be moved to the flight service when it will be done, it's temporary here
  getFlights(): Observable<Array<FlightDto>> {
    return this.httpClient.get<Array<FlightDto>>(this.flightApiUrl);
  }
}
