import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  flightId!: string;
  userId!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.flightId = params.get('flightId') ?? '';
      this.userId = params.get('userId') ?? '';
    });
  }

  onSubmit() {
    // Handle the form submission
    alert('Booking confirmed!');
  }
}
