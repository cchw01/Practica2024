import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AirportListMockService } from './airport-service';
import { AirportItem } from '../models/airport-item';

describe('AirportListMockService Unit Tests', () => {
  let service: AirportListMockService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:5198/api/Airport';
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AirportListMockService],
    });
    service = TestBed.inject(AirportListMockService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch a list of airports', () => {
    const mockAirports: Array<AirportItem> = [
      { airportId: 1, airportName: 'JFK', location: 'New York' },
      { airportId: 2, airportName: 'LAX', location: 'Los Angeles' },
    ];

    service.getAll().subscribe((airports) => {
      expect(airports.length).toBe(2);
      expect(airports).toEqual(mockAirports);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockAirports);
  });

  it('should add a new airport item', () => {
    const newAirport: AirportItem = {
      airportId: 3,
      airportName: 'ORD',
      location: 'Chicago',
    };
  
    spyOn(console, 'log');
  
    service.add(newAirport);
  
    const req = httpMock.expectOne('http://localhost:5198/api/Airport');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newAirport);
  
    req.flush(newAirport);
  
    expect(console.log).toHaveBeenCalledWith('Added:', newAirport);
  });

  it('should update an existing airport item', () => {
    const updatedAirport: AirportItem = {
      airportId: 1,
      airportName: 'JFK International',
      location: 'New York',
    };
  
    spyOn(console, 'log');
  
    service.update(updatedAirport);
  
    const req = httpMock.expectOne('http://localhost:5198/api/Airport');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedAirport);
  
    req.flush(updatedAirport);
  
    expect(console.log).toHaveBeenCalledWith('Updated:', updatedAirport);
  });

  it('should delete an airport item by ID', () => {
    const id = 1;
    const mockResponse: AirportItem = {
      airportId: id,
      airportName: 'JFK',
      location: 'New York',
    };

    service.delete(id).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}/${id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockResponse);
  });

  it('should fetch an airport item by ID', () => {
    const id = 1;
    const mockAirport: AirportItem = {
      airportId: id,
      airportName: 'JFK',
      location: 'New York',
    };

    service.getById(id).subscribe((airport) => {
      expect(airport).toEqual(mockAirport);
    });

    const req = httpMock.expectOne(`${apiUrl}/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockAirport);
  });
});
