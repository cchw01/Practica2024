import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { UserDto } from '../DTOs/user-dto';
import { UserItem } from '../models/user-item';
import { TicketItem } from '../models/ticket-item';

import * as CryptoJS from 'crypto-js';
import { LoginDto } from '../DTOs/login-dto';
import { FlightItem } from '../models/flight-item';
import { TicketDto } from '../DTOs/ticket-dto';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:5198/api/User';

  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<UserItem[]> {
    return this.httpClient
      .get<UserDto[]>(this.apiUrl)
      .pipe(map((usersDto) => usersDto.map((dto) => new UserItem(dto))));
  }

  getUserById(id: number): Observable<UserItem> {
    return this.httpClient
      .get<UserDto>(`${this.apiUrl}/${id}`)
      .pipe(map((dto) => new UserItem(dto)));
  }

  addUser(user: UserItem) {
    const hashedPassword = this.hashPassword(user.password);
    const userDto = {
      userId: 0,
      name: user.name,
      role: user.role,
      emailAddress: user.emailAddress,
      password: hashedPassword,
    };
    return this.httpClient.post<UserDto>(this.apiUrl, userDto);
  }

  updateUser(user: UserItem): Observable<any> {
    const userDto = {
      userId: user.userId,
      name: user.name,
      role: user.role,
      emailAddress: user.emailAddress,
      password: user.password || '', // Assuming password is optional for the update
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.httpClient.put<any>(`${this.apiUrl}/${user.userId}`, userDto, { headers });
  }

  deleteUser(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }

  getUserTickets(userId: number): Observable<TicketItem[]> {
    return this.httpClient
      .get<TicketDto[]>(`${this.apiUrl}/${userId}/tickets`)
      .pipe(
        map((ticketsDto) =>
          ticketsDto.map(
            (ticketDto) =>
              new TicketItem({
                ticketId: ticketDto.ticketId,
                flightId: ticketDto.flightId,
                userId: ticketDto.userId,
                checkInId: ticketDto.checkInId,
                luggage: ticketDto.luggage,
                price: ticketDto.price,
                flight: new FlightItem(),
                passenger: new UserItem(),
              })
          )
        )
      );
  }

  register(user: UserItem) {
    const hashedPassword = this.hashPassword(user.password);
    const userDto = {
      userId: 0,
      name: user.name,
      role: user.role,
      emailAddress: user.emailAddress,
      password: hashedPassword,
    };
    return this.httpClient.post<UserDto>(`${this.apiUrl}/register`, userDto);
  }

  login(email: string, password: string): Observable<UserItem> {
    const hashedPassword = this.hashPassword(password);
    const loginDto: LoginDto = {
      emailAddress: email,
      password: hashedPassword,
    };
    return this.httpClient
      .post<UserDto>(`${this.apiUrl}/login`, loginDto)
      .pipe(map((dto) => new UserItem(dto)));
  }

  hashPassword(password: string): string {
    return CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
  }

  storeUserData(user: UserItem): void {
    const { password, ...userDetails } = user;
    localStorage.setItem('userData', JSON.stringify(userDetails));
  }
}
