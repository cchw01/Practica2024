import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './menu-items/admin/admin.component';
import { DiscountAdminComponent } from './menu-items/admin/discount-admin/discount-admin.component';
import { AircraftComponent } from './menu-items/aircraft-list/aircraft-list.component';
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
import { AddDiscountComponent } from './menu-items/admin/discount-admin/add-discount/add-discount.component';
import { AircraftAdminComponent } from './menu-items/admin/aircraft-admin/aircraft-admin.component';
import { AddAircraftComponent } from './menu-items/admin/aircraft-admin/add-aircraft/add-aircraft.component';



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
  { path: 'admin/discount/create', component: AddDiscountComponent },
  { path: 'admin/discount/create/:id', component: AddDiscountComponent},
  { path: 'booking/:flightId/:userId', component: BookingComponent },
  { path: 'admin/tickets', component: TicketsComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin/aircraft',component: AircraftAdminComponent},
  {path: 'admin/aircraft/create', component: AddAircraftComponent},
  {path: 'admin/aircraft/create/:id', component: AddAircraftComponent},
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
