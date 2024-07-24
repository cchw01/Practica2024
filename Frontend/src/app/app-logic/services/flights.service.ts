import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { FlightDto } from '../DTOs/flight-dto';
import { AircraftDto } from '../DTOs/aircraft-dto';
import { AirportDto } from '../DTOs/airport-dto';
import { UserDto } from '../DTOs/user-dto';
import { DiscountDto } from '../DTOs/discount-dto';
import { FlightItem } from '../models/flight-item';
import { AirportItem } from '../models/airport-item';
import { AircraftItem } from '../models/aircraft-item';
import { DiscountItem } from '../models/discount-item';
import { UserItem } from '../models/user-item';

@Injectable({
  providedIn: 'root',
})
export class FlightService {
  private apiUrl = 'http://localhost:5198/api';
  private aircraftUrl = 'http://localhost:5198/api/Aircraft';
  private airportUrl = 'http://localhost:5198/api/Airport';
  private flightUrl = 'http://localhost:5198/api/Flight';
  private discountUrl = 'http://localhost:5198/api/Discount';

  constructor(private http: HttpClient) {}

  // Helper functions for mapping DTOs to Items
  private mapAircraftDtoToAircraftItem(dto: AircraftDto): AircraftItem {
    return new AircraftItem({
      aircraftId: dto.aircraftId,
      registrationNumber: dto.registrationNumber,
      maker: dto.maker,
      model: dto.model,
      numberOfSeats: dto.numberOfSeats,
      autonomyInHours: dto.autonomyInHours,
      maxCargo: dto.maxCargo,
    });
  }

  private mapAirportDtoToAirportItem(dto: AirportDto): AirportItem {
    return new AirportItem({
      airportId: dto.airportId,
      airportName: dto.airportName,
      location: dto.location,
    });
  }

  private mapDiscountDtoToDiscountItem(dto: DiscountDto): DiscountItem {
    return new DiscountItem({
      discountId: dto.discountId,
      flightId: dto.flightId,
      discountPercentage: dto.discountPercentage,
      discountName: dto.discountName,
      discountDescription: dto.discountDescription,
      startDate: new Date(dto.startDate),
      endDate: new Date(dto.endDate),
    });
  }

  getFlights(): Observable<FlightItem[]> {
    return this.http.get<FlightDto[]>(`${this.apiUrl}/Flight`).pipe(
      switchMap((flightDtos) => {
        if (flightDtos.length === 0) return of([]);
        return forkJoin(
          flightDtos.map((flightDto) =>
            forkJoin({
              airportDep: this.http
                .get<AirportDto>(
                  `${this.airportUrl}/${flightDto.departingAirportId}`
                )
                .pipe(map(this.mapAirportDtoToAirportItem)),
              airportDest: this.http
                .get<AirportDto>(
                  `${this.airportUrl}/${flightDto.destinationAirportId}`
                )
                .pipe(map(this.mapAirportDtoToAirportItem)),
              aircraft: this.http
                .get<AircraftDto>(
                  `${this.apiUrl}/Aircraft/${flightDto.aircraftId}`
                )
                .pipe(map(this.mapAircraftDtoToAircraftItem)),
              discount: flightDto.discountId
                ? this.http
                    .get<DiscountDto>(
                      `${this.apiUrl}/Discount/${flightDto.discountId}`
                    )
                    .pipe(map(this.mapDiscountDtoToDiscountItem))
                : of(null),
            }).pipe(
              map(
                ({ airportDep, airportDest, aircraft, discount }) =>
                  new FlightItem({
                    ...flightDto,
                    departingAirport: airportDep,
                    destinationAirport: airportDest,
                    aircraft: aircraft,
                    flightTime: this.calculateFlightTime(
                      flightDto.departingTime,
                      flightDto.flightTime
                    ),
                    discountOffer: discount ?? undefined,
                  })
              )
            )
          )
        );
      })
    );
  }

  getFlight(flightNumber: number): Observable<FlightItem> {
    return this.http
      .get<FlightDto>(`${this.apiUrl}/Flight/${flightNumber}`)
      .pipe(
        switchMap((flightDto) => {
          const airportDep = this.http
            .get<AirportDto>(
              `${this.apiUrl}/Airport/${flightDto.departingAirportId}`
            )
            .pipe(map(this.mapAirportDtoToAirportItem));
          const airportDest = this.http
            .get<AirportDto>(
              `${this.apiUrl}/Airport/${flightDto.destinationAirportId}`
            )
            .pipe(map(this.mapAirportDtoToAirportItem));
          const aircraft = this.http
            .get<AircraftDto>(`${this.apiUrl}/Aircraft/${flightDto.aircraftId}`)
            .pipe(map(this.mapAircraftDtoToAircraftItem));
          const discount = flightDto.discountId
            ? this.http
                .get<DiscountDto>(
                  `${this.apiUrl}/Discount/${flightDto.discountId}`
                )
                .pipe(map(this.mapDiscountDtoToDiscountItem))
            : of(null);

          return forkJoin({ airportDep, airportDest, aircraft, discount }).pipe(
            map(
              ({ airportDep, airportDest, aircraft, discount }) =>
                new FlightItem({
                  ...flightDto,
                  departingAirport: airportDep,
                  destinationAirport: airportDest,
                  aircraft: aircraft,
                  flightTime: this.calculateFlightTime(
                    flightDto.departingTime,
                    flightDto.flightTime
                  ),
                  discountOffer: discount ?? undefined,
                })
            )
          );
        })
      );
  }

  addFlight(flight: FlightItem): Observable<void> {
    const departingTime = new Date(flight.departingTime);
    const flightDto: FlightDto = {
      flightNumber: 0,
      departingAirportId: flight.departingAirportId,
      destinationAirportId: flight.destinationAirportId,
      aircraftId: flight.aircraftId,
      departingTime: departingTime,
      flightTime: this.convertToFlightTime(
        flight.departingTime,
        flight.flightTime
      ),
      flightCost: flight.flightCost,
      discountId: flight.discountOffer?.discountId,
    };
    return this.http.post<void>(`${this.apiUrl}/Flight`, flightDto);
  }

  updateFlight(flight: FlightItem): Observable<void> {
    const departingTime = new Date(flight.departingTime);
    const flightDto: FlightDto = {
      flightNumber: flight.flightNumber,
      departingAirportId: flight.departingAirportId,
      destinationAirportId: flight.destinationAirportId,
      aircraftId: flight.aircraftId,
      departingTime: departingTime,
      flightTime: this.convertToFlightTime(
        flight.departingTime,
        flight.flightTime
      ),
      flightCost: flight.flightCost,
      discountId: flight.discountOffer?.discountId,
    };

    return this.http.put<void>(`${this.apiUrl}/Flight`, flightDto);
  }

  deleteFlight(flightNumber: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/Flight/${flightNumber}`);
  }

  getFlightPassengers(flightNumber: number): Observable<UserItem[]> {
    return this.http
      .get<UserDto[]>(`${this.apiUrl}/Flight/${flightNumber}/passengers`)
      .pipe(
        map((userDtos) =>
          userDtos.map(
            (userDto) =>
              new UserItem({
                userId: userDto.userId,
                name: userDto.name,
                role: userDto.role,
                emailAddress: userDto.emailAddress,
                password: userDto.password,
              })
          )
        )
      );
  }
  searchFlights(
    departingAirportId: number,
    destinationAirportId: number,
    departureDate: Date
  ): Observable<FlightItem[]> {
    return this.http
      .get<FlightDto[]>(
        `${this.apiUrl}/Flight/${departingAirportId}/${destinationAirportId}/${departureDate}`,
        
      )
      .pipe(
        switchMap((flightDtos) => {
          if (flightDtos.length === 0) return of([]);
          return forkJoin(
            flightDtos.map((flightDto) =>
              forkJoin({
                airportDep: this.http
                  .get<AirportDto>(
                    `${this.airportUrl}/${flightDto.departingAirportId}`
                  )
                  .pipe(map(this.mapAirportDtoToAirportItem)),
                airportDest: this.http
                  .get<AirportDto>(
                    `${this.airportUrl}/${flightDto.destinationAirportId}`
                  )
                  .pipe(map(this.mapAirportDtoToAirportItem)),
                aircraft: this.http
                  .get<AircraftDto>(
                    `${this.apiUrl}/Aircraft/${flightDto.aircraftId}`
                  )
                  .pipe(map(this.mapAircraftDtoToAircraftItem)),
                discount: flightDto.discountId
                  ? this.http
                      .get<DiscountDto>(
                        `${this.apiUrl}/Discount/${flightDto.discountId}`
                      )
                      .pipe(map(this.mapDiscountDtoToDiscountItem))
                  : of(null),
              }).pipe(
                map(
                  ({ airportDep, airportDest, aircraft, discount }) =>
                    new FlightItem({
                      ...flightDto,
                      departingAirport: airportDep,
                      destinationAirport: airportDest,
                      aircraft: aircraft,
                      flightTime: this.calculateFlightTime(
                        flightDto.departingTime,
                        flightDto.flightTime
                      ),
                      discountOffer: discount ?? undefined,
                    })
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

  private convertToFlightTime(departureDate: Date, flightTime: number): Date {
    const departureDateTime = new Date(departureDate);
    const arrivalDateTime = new Date(
      departureDateTime.getTime() + flightTime * 60 * 1000
    );
    return arrivalDateTime;
  }
  
}
