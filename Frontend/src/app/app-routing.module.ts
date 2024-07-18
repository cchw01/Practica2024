import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './menu-items/admin/admin.component';
import { DiscountAdminComponent } from './menu-items/admin/discount-admin/discount-admin.component';
import { BookingComponent } from './menu-items/booking/booking.component';
import { TicketsComponent } from './menu-items/booking/tickets/tickets.component';
import { CheckInComponent } from './menu-items/check-in/check-in.component';
import { ContactComponent } from './menu-items/contact/contact.component';
import { FlightsComponent } from './menu-items/flights/flights.component';
import { HomePageComponent } from './menu-items/home-page/home-page.component';
import { LoginComponent } from './menu-items/login/login.component';
import { RegisterComponent } from './menu-items/register/register.component';
import { UserProfileComponent } from './menu-items/user-profile/user-profile.component';

import { FlightsComponent } from './menu-items/flights/flights.component';
import { AircraftComponent } from './menu-items/aircraft-list/aircraft-list.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'check-in', component: CheckInComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user', component: UserProfileComponent },
  { path: 'flights', component: FlightsComponent },

  { path : 'aircraft', component: AircraftComponent},
  // For wildcard route we could either redirect to the home page or to some NotFoundComponent
  { path: '**', redirectTo: '' },];



  { path: 'admin', component: AdminComponent },
  { path: 'admin/discount', component: DiscountAdminComponent },
  { path: 'booking/:flightId/:userId', component: BookingComponent },
  { path: 'tickets', component: TicketsComponent },
  // For wildcard route we could either redirect to the home page or to some NotFoundComponent
  { path: '**', redirectTo: '' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
