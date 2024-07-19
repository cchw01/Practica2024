import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './menu-items/home-page/home-page.component';
import { ContactComponent } from './menu-items/contact/contact.component';
import { LoginComponent } from './menu-items/login/login.component';
import { CheckInComponent } from './menu-items/check-in/check-in.component';
import { FlightsComponent } from './menu-items/flights/flights.component';
import { FlightComponent } from './menu-items/flights/flight/flight.component';
import { UserProfileComponent } from './menu-items/user-profile/user-profile.component';
import { AircraftComponent } from './menu-items/aircraft-list/aircraft-list.component';
import { AdminComponent } from './menu-items/admin/admin.component';
import { DiscountAdminComponent } from './menu-items/admin/discount-admin/discount-admin.component';
import { BookingComponent } from './menu-items/booking/booking.component';
import { TicketsComponent } from './menu-items/booking/tickets/tickets.component';
import { RegisterComponent } from './menu-items/register/register.component';
import { AddDiscountComponent } from './menu-items/admin/discount-admin/add-discount/add-discount.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  { path: 'check-in', component: CheckInComponent },
  { path: 'flights', component: FlightsComponent },
  { path: 'flights/:id', component: FlightComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'aircraft', component: AircraftComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'admin/discount', component: DiscountAdminComponent },
  { path: 'booking/:flightId/:userId', component: BookingComponent },
  { path: 'tickets', component: TicketsComponent },
  { path: 'register', component: RegisterComponent },
  {path: 'admin/discount/create', component: AddDiscountComponent},
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
