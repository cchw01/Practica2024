import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAircraftComponent } from './menu-items/admin/aircraft-admin/add-aircraft/add-aircraft.component';
import { AircraftAdminComponent } from './menu-items/admin/aircraft-admin/aircraft-admin.component';
import { CheckInAdminComponent } from './menu-items/admin/check-in-admin/check-in-admin.component';
import { AddDiscountComponent } from './menu-items/admin/discount-admin/add-discount/add-discount.component';
import { DiscountAdminComponent } from './menu-items/admin/discount-admin/discount-admin.component';
import { BookingComponent } from './menu-items/booking/booking.component';
import { TicketsComponent } from './menu-items/booking/tickets/tickets.component';
import { CheckInComponent } from './menu-items/check-in/check-in.component';
import { ContactComponent } from './menu-items/contact/contact.component';
import { FlightComponent } from './menu-items/flights/flight/flight.component';
import { FlightsComponent } from './menu-items/flights/flights.component';
import { HomePageComponent } from './menu-items/home-page/home-page.component';
import { LoginComponent } from './menu-items/login/login.component';
import { RegisterComponent } from './menu-items/register/register.component';
import { UserProfileComponent } from './menu-items/user-profile/user-profile.component';

import { AddFlightComponent } from './menu-items/admin/flights-admin/add-flight/add-flight.component';
import { FlightsAdminComponent } from './menu-items/admin/flights-admin/flights-admin.component';

import { AddAirportComponent } from './menu-items/admin/airport-admin/add-airport/add-airport.component';
import { AirportAdminComponent } from './menu-items/admin/airport-admin/airport-admin.component';
import { AddCheckInComponent } from './menu-items/admin/check-in-admin/add-checkIn/add-check-in/add-check-in.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  { path: 'check-in', component: CheckInComponent },
  { path: 'flights', component: FlightsComponent },
  { path: 'flights/:id', component: FlightComponent },
  { path: 'flights/:departingAirportId/:destinationAirportId/:departureDate', component: FlightsComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'admin/discount', component: DiscountAdminComponent },
  { path: 'admin/discount/create', component: AddDiscountComponent },
  { path: 'admin/discount/create/:id', component: AddDiscountComponent },
  { path: 'booking/:flightId', component: BookingComponent },
  { path: 'tickets', component: TicketsComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'admin/aircraft', component: AircraftAdminComponent },
  { path: 'admin/aircraft/create', component: AddAircraftComponent },
  { path: 'admin/aircraft/create/:id', component: AddAircraftComponent },
  { path: 'admin/flights', component: FlightsAdminComponent },
  { path: 'admin/flights/create', component: AddFlightComponent },
  { path: 'admin/flights/create/:id', component: AddFlightComponent },

  { path: 'admin/airport', component: AirportAdminComponent },
  { path: 'admin/airport/create', component: AddAirportComponent },
  { path: 'admin/airport/create/:id', component: AddAirportComponent },

  { path: 'admin/check-in', component: CheckInAdminComponent },
  { path: 'admin/check-in/create', component: AddCheckInComponent },
  { path: 'admin/check-in/create/:id', component: AddCheckInComponent },

  { path: 'admin/tickets', component: TicketsComponent },

  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
