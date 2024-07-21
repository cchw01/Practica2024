import { Injectable } from '@angular/core';
import { FlightItem } from '../models/flight-item';

@Injectable({
  providedIn: 'root',
})
export class FlightMockService {
  flightMockData: FlightItem[] = [
    {
      flightNumber: 1001,
      departingAirport: {
        airportId: 1,
        airportName: 'John F. Kennedy International Airport',
        location: 'New York, USA',
      },
      destinationAirport: {
        airportId: 2,
        airportName: 'Los Angeles International Airport',
        location: 'Los Angeles, USA',
      },
      departingTime: new Date('2024-08-01T09:20:30Z'),
      flightTime: 370, // in minutes
      aircraft: {
        aircraftId: 1,
        registrationNumber: 'N12345',
        maker: 'Boeing',
        model: '747',
        numberOfSeats: 416,
        autonomyInHours: 14,
        maxCargo: 112760, // in kg
      },
      flightCost: 350,
      discountOffer: {
        discountId: 1,
        flightId: 0, // This will be populated later to avoid circular reference
        discountPercentage: 20,
        discountName: 'SUMMER20',
        discountDescription: 'Summer Discount 20%',
        startDate: new Date('2024-06-01T00:00:00Z'),
        endDate: new Date('2024-08-31T23:59:59Z'),
      },
    },
    {
      flightNumber: 1002,
      departingAirport: {
        airportId: 3,
        airportName: 'Heathrow Airport',
        location: 'London, UK',
      },
      destinationAirport: {
        airportId: 4,
        airportName: 'Charles de Gaulle Airport',
        location: 'Paris, France',
      },
      departingTime: new Date('2024-08-01T13:00:00Z'),
      flightTime: 75, // in minutes
      aircraft: {
        aircraftId: 2,
        registrationNumber: 'G-ABCD',
        maker: 'Airbus',
        model: 'A320',
        numberOfSeats: 180,
        autonomyInHours: 6,
        maxCargo: 16000, // in kg
      },
      flightCost: 150,
      discountOffer: {
        discountId: 2,
        flightId: 0, // This will be populated later to avoid circular reference
        discountPercentage: 10,
        discountName: 'EURO10',
        discountDescription: 'Europe Travel Discount 10%',
        startDate: new Date('2024-07-01T00:00:00Z'),
        endDate: new Date('2024-09-30T23:59:59Z'),
      },
    },
    {
      flightNumber: 1003,
      departingAirport: {
        airportId: 5,
        airportName: 'Narita International Airport',
        location: 'Tokyo, Japan',
      },
      destinationAirport: {
        airportId: 6,
        airportName: 'Sydney Kingsford Smith Airport',
        location: 'Sydney, Australia',
      },
      departingTime: new Date('2024-08-01T22:00:00Z'),
      flightTime: 600, // in minutes
      aircraft: {
        aircraftId: 3,
        registrationNumber: 'JA7890',
        maker: 'Boeing',
        model: '777',
        numberOfSeats: 396,
        autonomyInHours: 16,
        maxCargo: 156000, // in kg
      },
      flightCost: 750,
      discountOffer: {
        discountId: 3,
        flightId: 0, // This will be populated later to avoid circular reference
        discountPercentage: 15,
        discountName: 'AUSSIE15',
        discountDescription: 'Australian Adventure Discount 15%',
        startDate: new Date('2024-05-01T00:00:00Z'),
        endDate: new Date('2024-08-31T23:59:59Z'),
      },
    },
  ];

  constructor() {}

  getFlightsData(): FlightItem[] {
    return this.flightMockData;
  }

  // createFlight() {}

  // getFlightById(id: number): FlightItem {}

  // updateFlight(newItem: FlightItem, id: number): void {}

  // deleteFlight(id: number): void {}
}
