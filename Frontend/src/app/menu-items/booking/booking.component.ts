import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  ticket = {
    ticketId: 123456,
    flight: 'Flight XYZ123',
    passenger: 'John Doe',
    checkIn: 'Online',
    luggage: true,
    price: 199.99
  };

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Additional initialization if necessary
  }

  onSubmit() {
    // Handle the form submission
    alert('Booking confirmed!');
  }

  goBack() {
    // Navigate back to the previous page or homepage
    this.router.navigate(['/']);
  }
}
