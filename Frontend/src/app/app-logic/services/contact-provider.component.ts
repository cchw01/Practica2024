import { Injectable } from "@angular/core";
import { ContactData } from "../contact-data";
@Injectable({
    providedIn: 'root',
  })
  export class ContactProviderService {
    providedData = <ContactData>{
      info: 'Watery  Airline',
      address: 'Str. Turnului nr. 5, 500152, Brasov, Romania',
      openDays: 'Monday - Friday',
      timeSlot: '9:00 - 17:00',
      phone: '0744 223 241',
      email: 'contact@wateryairline.com'
    };
  
    constructor() {}
  
    getData(): ContactData {
      return this.providedData;
    }
  }
  