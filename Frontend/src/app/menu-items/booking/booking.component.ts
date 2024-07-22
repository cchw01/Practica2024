import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightItem } from '../../app-logic/models/flight-item';
import { TicketItem } from '../../app-logic/models/ticket-item';
import { UserItem } from '../../app-logic/models/user-item';
import { TicketService } from '../../app-logic/services/ticket.service';
import { FlightService } from '../../app-logic/services/flights.service';
import { UserService } from '../../app-logic/services/user.service';
import { DiscountPipe } from '../../app-logic/pipes/discountPrice.pipe';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
  providers: [DiscountPipe]
})
export class BookingComponent implements OnInit {
  flightId!: number;
  userId!: number;
  formFlight!: FlightItem;
  formUser!: UserItem;

  formLuggage!: boolean;
  ticket!: TicketItem;
  formPrice!: number;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event): void {
    this.reveal();
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ticketService: TicketService,
    private flightService: FlightService,
    private userService: UserService,
    private discountPipe: DiscountPipe
  ) {
    this.route.params.subscribe((params) => {
      this.flightId = params['flightId'];
      this.userId = params['userId'];
    });
  }

  ngOnInit(): void {
    this.flightService.getFlight(this.flightId).subscribe(
      flightItem => {
        this.formFlight = flightItem;
        if (this.formFlight) {
          this.formPrice = this.formFlight.flightCost;
          if (this.formFlight.discountOffer) {
            this.formPrice = this.discountPipe.transform(this.formFlight.flightCost, this.formFlight.discountOffer.discountPercentage);
          }
       
      }
      });
    this.userService.getUserById(this.userId).subscribe(
      userItem => {
        this.formUser = userItem;
      }
    );
  }

  onSubmit() {
    if (
      this.flightId &&
      this.userId &&
      this.formLuggage !== null &&
      this.formLuggage !== undefined &&
      typeof this.formPrice === 'number'
    ) {
      alert('Booking confirmed!');
      const ticketDto = {
        ticketId: 0, // Assuming new ticket, ID will be set by backend
        flightId: this.flightId,
        userId: this.userId,
        checkInId: undefined,
        luggage: this.formLuggage,
        price: this.formPrice
      };
      // this.ticketService.addTicket(ticketDto).subscribe(
      //   newTicket => {
      //     this.ticket = newTicket;
      //   },
      //   error => {
      //     alert('Error booking ticket: ' + error.message);
      //   }
      // );
    } else {
      alert('Please fill out all required fields correctly.');
    }
  }

  recalculatePrice(): void {
    if (this.formLuggage) {
      this.formPrice += 50;
    } else {
      this.formPrice = this.formFlight.flightCost;
      if (this.formFlight.discountOffer) {
        this.formPrice = this.discountPipe.transform(this.formFlight.flightCost, this.formFlight.discountOffer.discountPercentage);
      }
    }
  }
    
  

  goBack() {
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
