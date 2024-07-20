import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightItem } from '../../app-logic/models/flight-item';
import { TicketItem } from '../../app-logic/models/ticket-item';
import { UserItem } from '../../app-logic/models/user-item';
import { AirportItem } from '../../app-logic/models/airport-item';
import { DiscountItem } from '../../app-logic/models/discount-item';
import { TicketService } from '../../app-logic/services/ticket.service';
import { DiscountPipe } from '../../app-logic/pipes/discountPrice.pipe';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
  providers: [DiscountPipe]
})
export class BookingComponent implements OnInit {
  flightItem!: FlightItem;
  userItem!: UserItem;
  departingAirport!: AirportItem;
  destinationAirport!: AirportItem;
  discountOfferItem!: DiscountItem;
  discountOfferPer!:number;
  departingAirportName!: string;
  destinationAirportName!: string;
  formTicketId!:number;
  formFlightId!:number;
  formUserId!:number;
  formLuggage!:boolean;
  formPrice!:number;
  ticket!: TicketItem;
  submitted: boolean = false;
  
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event): void {
    this.reveal();
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ticketservice: TicketService,
    private discountPipe: DiscountPipe
  ) {
    this.route.params.subscribe((params) => {
      this.formFlightId = params['flightId'];
      this.formUserId = params['userId'];
    });
  }

  ngOnInit(): void {
    // Fetch flight data
    this.fetchFlightData();

    // Fetch user data separately
    this.ticketservice.getUserId(this.formUserId).subscribe(
      userItem => {
        this.userItem = userItem;
        console.log(this.userItem);
        this.formUserId=this.userItem.userId;
      },
      error => {
        console.error('Error fetching user data', error);
      }
    );
    const FormcheckIn = false;
  }

  fetchFlightData(): void {
    this.ticketservice.getFlightId(this.formFlightId).subscribe(
      flightItem => {
        this.flightItem = flightItem;
        this.formPrice=flightItem.flightCost;
        console.log(this.flightItem.flightCost);
        this.fetchDepartingAirportData(this.flightItem.departingAirportId!);
        this.fetchDestinationAirportData(this.flightItem.destinationAirportId!);
        if (this.flightItem.discountOfferId !== undefined) {
          this.fetchDiscountData(this.flightItem.discountOfferId);
        }
        this.formFlightId=flightItem.flightNumber;
      },
      error => {
        console.error('Error fetching flight data', error);
      }
    );
  }

  fetchDepartingAirportData(departingAirportId: number): void {
    this.ticketservice.getAirportId(departingAirportId).subscribe(
      departingAirport => {
        this.departingAirport = departingAirport;
        this.departingAirportName=departingAirport.airportName;
        console.log(this.departingAirport);
      },
      error => {
        console.error('Error fetching departing airport data', error);
      }
    );
  }

  fetchDestinationAirportData(destinationAirportId: number): void {
    this.ticketservice.getAirportId(destinationAirportId).subscribe(
      destinationAirport => {
        this.destinationAirport = destinationAirport;
        this.destinationAirportName=destinationAirport.airportName;
        console.log(this.destinationAirport);
      },
      error => {
        console.error('Error fetching destination airport data', error);
      }
    );
  }

  fetchDiscountData(discountOfferId: number): void {
    this.ticketservice.getDiscountId(discountOfferId).subscribe(
      discountItem => {
        this.discountOfferItem = discountItem;
        console.log(this.discountOfferItem);
        this.calculatePrice(); // Calculate price after discount data is fetched
        this.discountOfferPer=discountItem.discountPercentage;
      },
      error => {
        console.error('Error fetching discount data', error);
      }
    );
  }

  calculatePrice(): void {
      this.formPrice = this.discountPipe.transform(this.flightItem.flightCost, this.discountOfferItem.discountPercentage);
  }
 
  onSubmit(): void {
    if (
      typeof this.formFlightId === 'number' &&
      typeof this.formUserId === 'number' &&
      this.formLuggage !== null &&
      this.formLuggage !== undefined &&
      typeof this.formPrice === 'number'
    ) {
      this.ticket=new TicketItem();
      this.ticket.flightId = this.formFlightId;
      this.ticket.userId = this.formUserId;
      this.ticket.luggage = this.formLuggage;
      this.ticket.price = this.formPrice;
      this.ticketservice.addTicket(this.ticket);
      alert('Booking confirmed!');
    } else {
  // Provide feedback if validation fails
  alert('Please fill out all required fields correctly.');
}
  } 
  goBack() {
    // Navigate back to the previous page or homepage
    this.router.navigate(['']);
  }

  reveal(): void {
    const reveals = document.querySelectorAll('.reveal');
    for (let i = 0; i < reveals.length; i++) {
      const windowHeight = window.innerHeight;
      const revealTop = reveals[i].getBoundingClientRect().top;
      const revealPoint = 200;
      if (revealTop < windowHeight - revealPoint) {
        reveals[i].classList.add('active');
      } else {
        reveals[i].classList.remove('active');
      }
    }
  }
}
