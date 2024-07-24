import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { UserDto } from '../DTOs/user-dto';
import { UserItem } from '../models/user-item';
import { TicketItem } from '../models/ticket-item';

import * as CryptoJS from 'crypto-js';
import { LoginDto } from '../DTOs/login-dto';
import { FlightItem } from '../models/flight-item';
import { TicketDto } from '../DTOs/ticket-dto';
import { AirportItem } from '../models/airport-item';
import { FlightDto } from '../DTOs/flight-dto';
import { AirportDto } from '../DTOs/airport-dto';
import { AircraftDto } from '../DTOs/aircraft-dto';
import { AircraftItem } from '../models/aircraft-item';
import { DiscountItem } from '../models/discount-item';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:5198/api/User';
  private flightUrl = 'http://localhost:5198/api/Flight';
  private airportUrl = 'http://localhost:5198/api/Airport';
  private aircraftUrl = 'http://localhost:5198/api/Aircraft';

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
      password: user.password, // Assuming password is optional for the update
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.httpClient.put<any>(this.apiUrl, userDto, { headers });
  }

  deleteUser(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }

  getUserTickets(userId: number): Observable<TicketItem[]> {
    return this.httpClient
      .get<TicketDto[]>(`${this.apiUrl}/${userId}/tickets`)
      .pipe(
        switchMap((ticketsDto) => {
          if (ticketsDto.length === 0) return of([]);
          return forkJoin(
            ticketsDto.map((ticketDto) =>
              forkJoin({
                flight: this.httpClient.get<FlightDto>(
                  `${this.flightUrl}/${ticketDto.flightId}`
                ),
                passenger: this.httpClient.get<UserDto>(
                  `${this.apiUrl}/${ticketDto.userId}`
                ),
              }).pipe(
                switchMap(({ flight, passenger }) =>
                  forkJoin({
                    departingAirport: this.httpClient.get<AirportDto>(
                      `${this.airportUrl}/${flight.departingAirportId}`
                    ),
                    destinationAirport: this.httpClient.get<AirportDto>(
                      `${this.airportUrl}/${flight.destinationAirportId}`
                    ),
                    aircraft: this.httpClient.get<AircraftDto>(
                      `${this.aircraftUrl}/${flight.aircraftId}`
                    ),
                  }).pipe(
                    map(
                      ({ departingAirport, destinationAirport, aircraft }) =>
                        new TicketItem({
                          ticketId: ticketDto.ticketId,
                          flightId: ticketDto.flightId,
                          userId: ticketDto.userId,
                          checkInId: ticketDto.checkInId,
                          luggage: ticketDto.luggage,
                          price: ticketDto.price,
                          flight: new FlightItem({
                            flightNumber: flight.flightNumber,
                            departingTime: new Date(flight.departingTime),
                            departingAirport: new AirportItem({
                              airportId: departingAirport.airportId,
                              airportName: departingAirport.airportName,
                              location: departingAirport.location,
                            }),
                            destinationAirport: new AirportItem({
                              airportId: destinationAirport.airportId,
                              airportName: destinationAirport.airportName,
                              location: destinationAirport.location,
                            }),
                            aircraft: new AircraftItem({
                              aircraftId: aircraft.aircraftId,
                              registrationNumber: aircraft.registrationNumber,
                              maker: aircraft.maker,
                              model: aircraft.model,
                              numberOfSeats: aircraft.numberOfSeats,
                              autonomyInHours: aircraft.autonomyInHours,
                              maxCargo: aircraft.maxCargo,
                            }),
                            flightCost: flight.flightCost,
                            flightTime: this.calculateFlightTime(
                              flight.departingTime,
                              flight.flightTime
                            ),
                            discountOffer: flight.discountId
                              ? new DiscountItem({
                                  discountId: flight.discountId,
                                })
                              : undefined,
                            departingAirportId: flight.departingAirportId,
                            destinationAirportId: flight.destinationAirportId,
                            aircraftId: flight.aircraftId,
                          }),
                          passenger: new UserItem(passenger),
                        })
                    )
                  )
                )
              )
            )
          );
        })
      );
  }
  private calculateFlightTime(departingTime: Date, arrivingTime: Date): number {
    const diffInMs =
      new Date(arrivingTime).getTime() - new Date(departingTime).getTime();
    return diffInMs / (1000 * 60);
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
