import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightItem } from '../../app-logic/models/flight-item';
import { TicketItem } from '../../app-logic/models/ticket-item';
import { UserItem } from '../../app-logic/models/user-item';
import { BookingListMockService } from '../../app-logic/booking-list-mock.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  ticket: TicketItem = new TicketItem();
  flightItem!:FlightItem;
  userItem!:UserItem;
  flightId!:number;
  userId!:number;


  constructor(private route: ActivatedRoute, private router: Router,private bookingListMockService:BookingListMockService) {
    this.route.params.subscribe((params)=>{
      this.flightId=params['flightId'];
      this.userId=params['userId'];
    });
  }

  ngOnInit(): void {
    this.flightItem = this.bookingListMockService.getFlightItemById(this.flightId);
    this.userItem = this.bookingListMockService.getUserItembyId(this.userId);
    this.ticket.flight = this.flightItem; 
    this.ticket.passager = this.userItem;
    this.ticket.price= this.ticket.flight.flightCost - ( this.ticket.flight.flightCost *  this.ticket.flight.discountOffer.discountPercentage / 100)
    this.ticket.checkIn=false;
  }

  onSubmit() {
    // Handle the form submission
    alert('Booking confirmed!');
  }

  goBack() {
    // Navigate back to the previous page or homepage
    this.router.navigate(['/contact']);
  }
}
