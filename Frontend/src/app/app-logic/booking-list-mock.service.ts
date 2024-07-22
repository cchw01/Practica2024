import { Injectable } from '@angular/core';
import { FlightItem } from './models/flight-item';
import { AirportItem } from './models/airport-item';
import { AircraftItem } from './models/aircraft-item';
import { DiscountItem } from './models/discount-item';
import { UserItem } from './models/user-item';
import { TicketItem } from './models/ticket-item';
import { CheckInItem, IdDocumentType } from './models/checkin-item';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BookingListMockService {
  httpclient!: HttpClient;
  apiUrlAircrafts = 'http://localhost:5198/api/Aircraft';
  aircraftsDatas: Observable<Array<AircraftItem>> = this.httpclient.get<
    Array<AircraftItem>
  >(this.apiUrlAircrafts);

  aircraftsData: Array<AircraftItem> = [
    {
      aircraftId: 1,
      registrationNumber: 'BC23YON',
      maker: 'MakerA',
      model: 'ModelX',
      numberOfSeats: 80,
      autonomyInHours: 30,
      maxCargo: 1000,
    },
    {
      aircraftId: 2,
      registrationNumber: 'DE45ZPM',
      maker: 'MakerB',
      model: 'ModelY',
      numberOfSeats: 150,
      autonomyInHours: 20,
      maxCargo: 1500,
    },
    {
      aircraftId: 3,
      registrationNumber: 'FG67QRS',
      maker: 'MakerC',
      model: 'ModelZ',
      numberOfSeats: 200,
      autonomyInHours: 25,
      maxCargo: 2000,
    },
  ];

  airportsData: Array<AirportItem> = [
    {
      airportId: 1,
      airportName: 'Aeroport Alba Iulia',
      location: 'Alba Iulia',
    },
    { airportId: 2, airportName: 'Aeroport Brasov', location: 'Brasov' },
    { airportId: 3, airportName: 'Aeroport Constanta', location: 'Constanta' },
    { airportId: 4, airportName: 'Aeroport Doicesti', location: 'Doicesti' },
    { airportId: 5, airportName: 'Aeroport Eforie', location: 'Eforie' },
    { airportId: 6, airportName: 'Aeroport Fagaras', location: 'Fagaras' },
    { airportId: 7, airportName: 'Aeroport Galati', location: 'Galati' },
    { airportId: 8, airportName: 'Aeroport Hunedoara', location: 'Hunedoara' },
    { airportId: 9, airportName: 'Aeroport Iasi', location: 'Iasi' },
  ];

  discountsData: Array<DiscountItem> = [
    {
      discountId: 1,
      flightId: 0,
      discountPercentage: 10,
      discountName: 'Summer Sale',
      discountDescription: '10% off on all summer flights',
      startDate: new Date('2024-06-01'),
      endDate: new Date('2024-08-31'),
    },
    {
      discountId: 2,
      flightId: 0,
      discountPercentage: 15,
      discountName: 'Winter Wonderland',
      discountDescription: '15% off on all winter flights',
      startDate: new Date('2024-12-01'),
      endDate: new Date('2025-02-28'),
    },
    {
      discountId: 3,
      flightId: 0,
      discountPercentage: 20,
      discountName: 'Early Bird',
      discountDescription: '20% off on early bookings',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-12-31'),
    },
  ];

  flightsData: Array<FlightItem> = [
    {
      flightNumber: 1,
      departingAirport: this.airportsData[0],
      destinationAirport: this.airportsData[1],
      departingTime: new Date('2024-07-21T08:00:00'),
      flightTime: 2,
      aircraft: this.aircraftsData[0],
      flightCost: 299,
      discountOffer: this.discountsData[0],
    },
    {
      flightNumber: 2,
      departingAirport: this.airportsData[1],
      destinationAirport: this.airportsData[2],
      departingTime: new Date('2024-07-22T10:00:00'),
      flightTime: 3,
      aircraft: this.aircraftsData[1],
      flightCost: 399,
      discountOffer: this.discountsData[1],
    },
    {
      flightNumber: 3,
      departingAirport: this.airportsData[2],
      destinationAirport: this.airportsData[3],
      departingTime: new Date('2024-07-23T12:00:00'),
      flightTime: 4,
      aircraft: this.aircraftsData[2], // aici se va modifica dupa ce toate serviciile se completeaza .
      flightCost: 499,
      discountOffer: this.discountsData[2],
    },
  ];

  usersData: Array<UserItem> = [
    {
      userId: 1,
      name: 'John Doe',
      role: 'Passenger',
      emailAddress: 'john.doe@example.com',
      password: 'password123',
      ticketList: [],
    },
    {
      userId: 2,
      name: 'Jane Smith',
      role: 'Passenger',
      emailAddress: 'jane.smith@example.com',
      password: 'password456',
      ticketList: [],
    },
    {
      userId: 3,
      name: 'Alice Johnson',
      role: 'Passenger',
      emailAddress: 'alice.johnson@example.com',
      password: 'password789',
      ticketList: [],
    },
  ];

  ticketsData: Array<TicketItem> = [
    {
      tickedId: 1,
      flight: this.flightsData[0],
      passager: this.usersData[0],
      checkIn: false,
      luggage: true,
      price: 299,
    },
    {
      tickedId: 2,
      flight: this.flightsData[1],
      passager: this.usersData[1],
      checkIn: false,
      luggage: false,
      price: 399,
    },
    {
      tickedId: 3,
      flight: this.flightsData[2],
      passager: this.usersData[2],
      checkIn: false,
      luggage: true,
      price: 499,
    },
    // 15 more tickets
    {
      tickedId: 4,
      flight: this.flightsData[0],
      passager: this.usersData[1],
      checkIn: true,
      luggage: false,
      price: 269,
    },
    {
      tickedId: 5,
      flight: this.flightsData[1],
      passager: this.usersData[2],
      checkIn: true,
      luggage: true,
      price: 359,
    },
    {
      tickedId: 6,
      flight: this.flightsData[2],
      passager: this.usersData[0],
      checkIn: true,
      luggage: false,
      price: 449,
    },
    {
      tickedId: 7,
      flight: this.flightsData[0],
      passager: this.usersData[2],
      checkIn: false,
      luggage: true,
      price: 289,
    },
    {
      tickedId: 8,
      flight: this.flightsData[1],
      passager: this.usersData[0],
      checkIn: false,
      luggage: false,
      price: 379,
    },
    {
      tickedId: 9,
      flight: this.flightsData[2],
      passager: this.usersData[1],
      checkIn: false,
      luggage: true,
      price: 489,
    },
    {
      tickedId: 10,
      flight: this.flightsData[0],
      passager: this.usersData[0],
      checkIn: true,
      luggage: false,
      price: 279,
    },
    {
      tickedId: 11,
      flight: this.flightsData[1],
      passager: this.usersData[2],
      checkIn: true,
      luggage: true,
      price: 369,
    },
    {
      tickedId: 12,
      flight: this.flightsData[2],
      passager: this.usersData[1],
      checkIn: true,
      luggage: false,
      price: 479,
    },
    {
      tickedId: 13,
      flight: this.flightsData[0],
      passager: this.usersData[2],
      checkIn: false,
      luggage: true,
      price: 299,
    },
    {
      tickedId: 14,
      flight: this.flightsData[1],
      passager: this.usersData[0],
      checkIn: false,
      luggage: false,
      price: 399,
    },
    {
      tickedId: 15,
      flight: this.flightsData[2],
      passager: this.usersData[1],
      checkIn: false,
      luggage: true,
      price: 499,
    },
    {
      tickedId: 16,
      flight: this.flightsData[0],
      passager: this.usersData[0],
      checkIn: true,
      luggage: false,
      price: 269,
    },
    {
      tickedId: 17,
      flight: this.flightsData[1],
      passager: this.usersData[1],
      checkIn: true,
      luggage: true,
      price: 359,
    },
    {
      tickedId: 18,
      flight: this.flightsData[2],
      passager: this.usersData[2],
      checkIn: true,
      luggage: false,
      price: 449,
    },
  ];


  constructor() {
    // Linking tickets and check-ins to users
    this.usersData[0].ticketList = [
      this.ticketsData[0],
      this.ticketsData[6],
      this.ticketsData[9],
      this.ticketsData[12],
      this.ticketsData[15],
    ];
    this.usersData[1].ticketList = [
      this.ticketsData[1],
      this.ticketsData[8],
      this.ticketsData[11],
      this.ticketsData[14],
      this.ticketsData[17],
    ];
    this.usersData[2].ticketList = [
      this.ticketsData[2],
      this.ticketsData[4],
      this.ticketsData[7],
      this.ticketsData[10],
      this.ticketsData[13],
    ];
  }

  getDataAircrafts(): Array<AircraftItem> {
    return this.aircraftsData;
  }
  getDataAirports(): Array<AirportItem> {
    return this.airportsData;
  }
  getDataDiscounts(): Array<DiscountItem> {
    return this.discountsData;
  }
  getDataFlights(): Array<FlightItem> {
    return this.flightsData;
  }
  getDataUsers(): Array<UserItem> {
    return this.usersData;
  }
  getDataTickets(): Array<TicketItem> {
    return this.ticketsData;
  }

  getFlightItemById(id: number): FlightItem {
    return this.flightsData.filter((x) => x.flightNumber == id)[0];
  }
  getUserItembyId(id: number): UserItem {
    return this.usersData.filter((x) => x.userId === id)[0];
  }
}
