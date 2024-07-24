import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from './app-logic/services/auth-guard.service';
import { RoleGuardService } from './app-logic/services/role-guard.service';

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
  { path: 'register', component: RegisterComponent },
  { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuardService] },
  { path: 'tickets', component: TicketsComponent, canActivate: [AuthGuardService] },
  { path: 'check-in', component: CheckInComponent},
  { path: 'flights', component: FlightsComponent},
  { path: 'flights/:id', component: FlightComponent},
  { path: 'flights/discounted-flight/:discountFlightId', component: FlightsComponent},
  { path: 'flights/:departingAirportId/:destinationAirportId/:departingTime', component: FlightsComponent },
  { path: 'booking/:flightId', component: BookingComponent, canActivate: [AuthGuardService] },

  {
    path: 'admin',
    canActivate: [AuthGuardService, RoleGuardService],
    data: { role: 'admin' },
    children: [
      { path: 'aircraft', component: AircraftAdminComponent },
      { path: 'aircraft/create', component: AddAircraftComponent },
      { path: 'aircraft/create/:id', component: AddAircraftComponent },
      { path: 'flights', component: FlightsAdminComponent },
      { path: 'flights/create', component: AddFlightComponent },
      { path: 'flights/create/:id', component: AddFlightComponent },
      { path: 'airport', component: AirportAdminComponent },
      { path: 'airport/create', component: AddAirportComponent },
      { path: 'airport/create/:id', component: AddAirportComponent },
      { path: 'check-in', component: CheckInAdminComponent },
      { path: 'check-in/create', component: AddCheckInComponent },
      { path: 'check-in/create/:id', component: AddCheckInComponent },
      { path: 'discount', component: DiscountAdminComponent },
      { path: 'discount/create', component: AddDiscountComponent },
      { path: 'discount/create/:id', component: AddDiscountComponent },
      { path: 'tickets', component: TicketsComponent },
    ]
  },
  
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
