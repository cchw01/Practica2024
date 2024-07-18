import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserItem } from '../models/user-item';
import { createHash } from 'crypto';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = 'https://localhost:5198/api/Airport';

  userData: Array<UserItem> = [];

  bcrypt = require('bcrypt');
  saltRounds = 10;
  myPlaintextPassword = 's0//P4$$w0rD';
  someOtherPlaintextPassword = 'not_bacon';

  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<Array<UserItem>> {
    return this.httpClient.get<Array<UserItem>>(this.apiUrl);
  }

  addUser(user: UserItem): void {
    var result;
    this.httpClient.post<UserItem>(this.apiUrl, user).subscribe((data) => {
      result = data;
      console.log(result);
    });
  }

  updateUser(user: UserItem): void {
    var result;
    this.httpClient.put<UserItem>(this.apiUrl, user).subscribe((data) => {
      result = data;
      console.log(result);
    });
  }

  deleteUser(id: number): void {
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
      this.userData.map(function (o) {
        return o.userId;
      })
    );
  }

  getUserById(id: number): Observable<UserItem> {
    return this.httpClient.get<UserItem>(this.apiUrl + '/' + id);
    //return this.inventoryData.filter((x) => x.id == id)[0];
  }

  hashPassword(password: string): string {
    const hash = createHash('sha256'); // or any other algorithm like 'sha512', 'md5', etc.
    hash.update(password);
    return hash.digest('hex'); // or 'base64' if you prefer
  }
}
