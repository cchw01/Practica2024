import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PasswordModule } from 'primeng/password';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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

import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ArrivalTimePipe } from './app-logic/pipes/arrivalTime.pipe';
import { DiscountPipe } from './app-logic/pipes/discountPrice.pipe';
import { FormatFlightTime } from './app-logic/pipes/formatFlightTime.pipe';
import { AdminComponent } from './menu-items/admin/admin.component';
import { DiscountAdminComponent } from './menu-items/admin/discount-admin/discount-admin.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ContactComponent,
    LoginComponent,
    CheckInComponent,
    UserProfileComponent,
    RegisterComponent,
    FlightsComponent,
    FlightComponent,
    AdminComponent,
    DiscountAdminComponent,
    UserProfileComponent,
    BookingComponent,
    TicketsComponent,
    DiscountPipe,
    ArrivalTimePipe,
    FormatFlightTime,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatInputModule,
    PasswordModule,
    ReactiveFormsModule,
    MatSelectModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
  ],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
