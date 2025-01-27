import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class BaseService<T> {
  constructor(private httpClient: HttpClient, private apiUrl: string) {}

  getAll(): Observable<Array<T>> {
    return this.httpClient.get<Array<T>>(this.apiUrl);
  }

  getById(id: number): Observable<T> {
    return this.httpClient.get<T>(`${this.apiUrl}/${id}`);
  }

  add(item: T): void {
    this.httpClient.post<T>(this.apiUrl, item).subscribe((response) => {
      console.log('Added:', response);
    });
  }

  update(item: T): void {
    this.httpClient.put<T>(this.apiUrl, item).subscribe((response) => {
      console.log('Updated:', response);
    });
  }

  delete(id: number): Observable<T> {
    return this.httpClient.delete<T>(`${this.apiUrl}/${id}`);
  }
}
