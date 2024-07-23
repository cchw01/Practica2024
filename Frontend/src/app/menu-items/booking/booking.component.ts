import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightItem } from '../../app-logic/models/flight-item';
import { TicketItem } from '../../app-logic/models/ticket-item';
import { UserItem } from '../../app-logic/models/user-item';
import { TicketService } from '../../app-logic/services/ticket.service';
import { FlightService } from '../../app-logic/services/flights.service';
import { UserService } from '../../app-logic/services/user.service';
import { DiscountPipe } from '../../app-logic/pipes/discountPrice.pipe';
import { LocalStorageService } from '../../app-logic/services/local-storage.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
  providers: [DiscountPipe],
})
export class BookingComponent implements OnInit {
  flightId!: number;
  userId!: number;
  formFlight!: FlightItem;
  formUser!: UserItem;
  formLuggage: boolean = false;
  ticket!: TicketItem;
  formPrice!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ticketService: TicketService,
    private flightService: FlightService,
    private localStorageService: LocalStorageService,
    private discountPipe: DiscountPipe
  ) {
    this.route.params.subscribe((params) => {
      this.flightId = params['flightId'];
    });
  }

  ngOnInit(): void {
    if (this.localStorageService.isLoggedIn) {
      this.formUser = this.localStorageService.userData;
      this.flightService.getFlight(this.flightId).subscribe((flightItem) => {
        this.formFlight = flightItem;
        this.updatePrice();
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

  onSubmit() {
    if (this.formFlight && this.formUser) {
      const newTicket = new TicketItem({
        ticketId: 0,
        flight: this.formFlight,
        passenger: this.formUser,
        luggage: this.formLuggage,
        price: this.formPrice,
      });
      this.ticketService.addTicket(newTicket).subscribe({
        next: (ticket) => {
          console.log('Ticket booked:', ticket);
          //alert('Booking successful!');
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Booking failed:', error);
          alert('Booking failed. Please try again.');
        },
      });
    }
  }

  updatePrice(): void {
    this.formPrice = this.formFlight.flightCost;
    if (this.formFlight.discountOffer) {
      this.formPrice = this.discountPipe.transform(
        this.formFlight.flightCost,
        this.formFlight.discountOffer.discountPercentage
      );
    }
    if (this.formLuggage) {
      this.formPrice += 50;
    }
  }

  goBack() {
    this.router.navigate(['/']);
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
