import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AirportListMockService } from './airport-service';
import { AirportItem } from '../models/airport-item';

describe('AirportListMockService Integration Tests', () => {
  let service: AirportListMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [AirportListMockService],
    });

    service = TestBed.inject(AirportListMockService);
  });

  it('should fetch a list of airports from the backend', (done) => {
    service.getDataAirports().subscribe((airports) => {
      expect(airports).toBeTruthy();
      expect(Array.isArray(airports)).toBe(true);

      if (airports.length > 0) {
        expect(airports[0].airportId).toBeDefined();
        expect(airports[0].airportName).toBeDefined();
        expect(airports[0].location).toBeDefined();
      }
      done();
    });
  });


  it('should add a new airport item and fetch it from the backend', (done) => {
    const newAirport: AirportItem = {
      airportId: 0,
      airportName: 'Test Airport',
      location: 'Test Location',
    };

    service.addItem(newAirport); -

    setTimeout(() => {
      service.getDataAirports().subscribe((airports) => {
        const addedAirport = airports.find(
          (airport) => airport.airportName === newAirport.airportName
        );
        expect(addedAirport).toBeTruthy();
        expect(addedAirport?.location).toBe(newAirport.location);
        done();
      });
    }, 2000);
  });
});
