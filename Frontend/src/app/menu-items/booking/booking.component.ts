import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  ticketId!: number;
  flight!: string; // Update this type as necessary
  passenger!: string; // Update this type as necessary
  checkIn!: string; // Update this type as necessary
  luggage!: boolean;
  price!: number;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.ticketId = +(params.get('ticketId') ?? 0);
      this.flight = params.get('flight') ?? '';
      this.passenger = params.get('passenger') ?? '';
      this.checkIn = params.get('checkIn') ?? '';
      this.luggage = (params.get('luggage') === 'true');
      this.price = +(params.get('price') ?? 0);
    });
  }

  onSubmit() {
    // Handle the form submission
    alert('Booking confirmed!');
  }
}
