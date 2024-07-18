import { Injectable } from "@angular/core";
import { ContactData } from "../contact-data";
@Injectable({
    providedIn: 'root',
  })
  export class ContactProviderService {
    providedData = <ContactData>{
      info: 'Watery  Airline',
      address: 'Str. Turnului nr. 5',
      openDays: 'Luni - Vineri',
      timeSlot: '9:00 - 17:00',
      phone: '0742232412',
    };
  
    constructor() {}
  
    getData(): ContactData {
      return this.providedData;
    }
  }
  