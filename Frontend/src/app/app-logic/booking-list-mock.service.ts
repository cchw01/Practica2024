import { Injectable } from '@angular/core';
import { FlightItem } from './models/flight-item';
import { AirportItem } from './models/airport-item';
import { AircraftItem } from './models/aircraft-item';
import { DiscountItem } from './models/discount-item';
import { UserItem } from './models/user-item';
import { TicketItem } from './models/ticket-item';
import { CheckInItem, IdDocumentType } from './models/checkin-item';

@Injectable({
  providedIn: 'root'
})
export class BookingListMockService {

  aircraftsData: Array<AircraftItem> = [
    {
      registrationNumber: 'BC23YON',
      maker: 'MakerA',
      model: 'ModelX',
      numberOfSeats: 80,
      autonomyInHours: 30,
      maxCargo: 1000,
    },
    {
      registrationNumber: 'DE45ZPM',
      maker: 'MakerB',
      model: 'ModelY',
      numberOfSeats: 150,
      autonomyInHours: 20,
      maxCargo: 1500,
    },
    {
      registrationNumber: 'FG67QRS',
      maker: 'MakerC',
      model: 'ModelZ',
      numberOfSeats: 200,
      autonomyInHours: 25,
      maxCargo: 2000,
    }
  ];
  airportsData: Array<AirportItem> = [
    { 
      airportId: 1,
      airportName: 'AeroportA',
      location: 'LocatiaA',
    },
    {
      airportId: 2,
      airportName: 'AeroportB',
      location: 'LocatiaB',
    },
    {
      airportId: 3,
      airportName: 'AeroportC',
      location: 'LocatiaC',
    },
    {
      airportId: 4,
      airportName: 'AeroportD',
      location: 'LocatiaD',
    },
  ];
  discountsData: Array<DiscountItem> = [
    {
      discountId: 1,
      flights: [],
      discountPercentage: 10,
      discountName: 'Summer Sale',
      discountDescription: '10% off on all summer flights',
      startDate: new Date('2024-06-01'),
      endDate: new Date('2024-08-31')
    },
    {
      discountId: 2,
      flights: [],
      discountPercentage: 15,
      discountName: 'Winter Wonderland',
      discountDescription: '15% off on all winter flights',
      startDate: new Date('2024-12-01'),
      endDate: new Date('2025-02-28')
    },
    {
      discountId: 3,
      flights: [],
      discountPercentage: 20,
      discountName: 'Early Bird',
      discountDescription: '20% off on early bookings',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-12-31')
    }
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
      aircraft: this.aircraftsData[2],
      flightCost: 499,
      discountOffer: this.discountsData[2],
    }
  ];
  usersData: Array<UserItem> = [
    {
      userId: 1,
      name: 'John Doe',
      role: 'Passenger',
      emailAddress: 'john.doe@example.com',
      password: 'password123',
      ticketList: []
    },
    {
      userId: 2,
      name: 'Jane Smith',
      role: 'Passenger',
      emailAddress: 'jane.smith@example.com',
      password: 'password456',
      ticketList: []
    },
    {
      userId: 3,
      name: 'Alice Johnson',
      role: 'Passenger',
      emailAddress: 'alice.johnson@example.com',
      password: 'password789',
      ticketList: []
    }
  ];
  ticketsData: Array<TicketItem> = [
    {
      tickedId: 1,
      flight: this.flightsData[0],
      passager: this.usersData[0],
      checkIn: false,
      luggage: true,
      price: 299
    },
    {
      tickedId: 2,
      flight: this.flightsData[1],
      passager: this.usersData[1],
      checkIn: false,
      luggage: false,
      price: 399
    },
    {
      tickedId: 3,
      flight: this.flightsData[2],
      passager: this.usersData[2],
      checkIn: false,
      luggage: true,
      price: 499
    }
  ];
  checkInsData: Array<CheckInItem> = [
    {
      checkInId: 1,
      ticket: this.ticketsData[0],
      passengerName: 'John Doe',
      idDocumentType: IdDocumentType.Passport,
      documentData: '123456789',
      checkInStatus: true,
      passengerEmail: 'john.doe@example.com'
    },
    {
      checkInId: 2,
      ticket: this.ticketsData[1],
      passengerName: 'Jane Smith',
      idDocumentType: IdDocumentType.IdentityCard,
      documentData: '987654321',
      checkInStatus: true,
      passengerEmail: 'jane.smith@example.com'
    },
    {
      checkInId: 3,
      ticket: this.ticketsData[2],
      passengerName: 'Alice Johnson',
      idDocumentType: IdDocumentType.DriverLicense,
      documentData: 'A1B2C3D4',
      checkInStatus: true,
      passengerEmail: 'alice.johnson@example.com'
    }
  ];

  constructor() {
    // Linking tickets and check-ins to users
    this.usersData[0].ticketList = [this.ticketsData[0]];
    this.usersData[1].ticketList = [this.ticketsData[1]];

  }

  getDataAircrafts(): Array<AircraftItem>{
    return this.aircraftsData;
  }
  getDataAirports(): Array<AirportItem>{
    return this.airportsData;
  }
  getDataDiscounts(): Array<DiscountItem>{
      return this.discountsData;
  }  
  getDataFlights(): Array<FlightItem>{
    return this.flightsData;
  }
  getDataUsers(): Array<UserItem>{
    return this.usersData;
  }
  getDataTickets(): Array<TicketItem>{
    return this.ticketsData;
  }
  getDataCheckIn(): Array<CheckInItem>{
    return this.checkInsData;
  }
}
