import { Injectable } from '@angular/core';
import { AircraftItem } from '../models/aircraft-item';

@Injectable({
  providedIn: 'root'
})
export class AircraftsListMockServices {
 
  
  aircraftData: Array<AircraftItem> = [
   
      {
        registrationNumber: 'N737',
        maker: 'Boeing',
        model: '737',
        numberOfSeats: 215,
        autonomyInHours: 7,
        maxCargo: 18000
      },
     {
        registrationNumber: 'A320',
        maker: 'Airbus',
        model: 'A320',
        numberOfSeats: 180,
        autonomyInHours: 6.5,
        maxCargo: 16600
      },
     {
        registrationNumber: 'N777',
        maker: 'Boeing',
        model: '777',
        numberOfSeats: 396,
        autonomyInHours: 17,
        maxCargo: 22680
      },
      {
        registrationNumber: 'A380',
        maker: 'Airbus',
        model: 'A380',
        numberOfSeats: 853,
        autonomyInHours: 16,
        maxCargo: 30000
      },
     {
        registrationNumber: 'C172',
        maker: 'Cessna',
        model: '172',
        numberOfSeats: 4,
        autonomyInHours: 5,
        maxCargo: 340
      }
    ];
    
  constructor() {}

  getData(): Array<AircraftItem> {
    return this.aircraftData;
  }
  addItem(item: AircraftItem) {
    this.aircraftData.push(item);
  }
 
}

  


