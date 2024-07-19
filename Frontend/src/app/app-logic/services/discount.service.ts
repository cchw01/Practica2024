import { Injectable } from '@angular/core';
import { DiscountItem } from '../models/discount-item';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DiscountDto } from '../DTOs/discount-dto';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  apiUrl = 'http://localhost:5198/api/Discount';

  discountData: Array<DiscountItem> = [];

  constructor(private httpClient: HttpClient) { }

  getDiscounts(): Observable<Array<DiscountItem>> {
    return this.httpClient.get<Array<DiscountItem>>(this.apiUrl);
  }

  addDiscount(discount: DiscountItem): void {
    var result;
    this.httpClient.post<DiscountItem>(this.apiUrl, discount).subscribe((data) => {
      result = data;
      console.log(result);
    });
  }

  updateDiscount(discount: DiscountItem): void {
    var result;
    this.httpClient.put<DiscountItem>(this.apiUrl, discount).subscribe((data) => {
      result = data;
      console.log(result);
    });
  }

  deleteDiscount(id: number): void {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: { id: id },
    };
    this.httpClient.delete<void>(this.apiUrl, options).subscribe({
      next: (data) => {
        console.log('Delete successful', data);
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  }
  getLastId(): number {
    return Math.max.apply(
      Math,
      this.discountData.map(function (o) {
        return o.discountId;
      })
    );
  }

  getDiscountById(id: number): Observable<DiscountItem> {
    return this.httpClient.get<DiscountItem>(this.apiUrl + '/' + id);
  }

  
}
