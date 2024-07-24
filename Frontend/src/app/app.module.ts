import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
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
import { DiscountAdminComponent } from './menu-items/admin/discount-admin/discount-admin.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ArrivalTimePipe } from './app-logic/pipes/arrivalTime.pipe';
import { DiscountPipe } from './app-logic/pipes/discountPrice.pipe';
import { FormatFlightTime } from './app-logic/pipes/formatFlightTime.pipe';
import { FooterComponent } from './menu-items/footer/footer.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { provideHttpClient } from '@angular/common/http';
import { AddDiscountComponent } from './menu-items/admin/discount-admin/add-discount/add-discount.component';
import { AircraftAdminComponent } from './menu-items/admin/aircraft-admin/aircraft-admin.component';
import { AddAircraftComponent } from './menu-items/admin/aircraft-admin/add-aircraft/add-aircraft.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FlightsAdminComponent } from './menu-items/admin/flights-admin/flights-admin.component';
import { AddFlightComponent } from './menu-items/admin/flights-admin/add-flight/add-flight.component';

import { AirportAdminComponent } from './menu-items/admin/airport-admin/airport-admin.component';
import { AddAirportComponent } from './menu-items/admin/airport-admin/add-airport/add-airport.component';

import { CheckInAdminComponent } from './menu-items/admin/check-in-admin/check-in-admin.component';
import { AddCheckInComponent } from './menu-items/admin/check-in-admin/add-checkIn/add-check-in/add-check-in.component';

import { QrCodeModule } from 'ng-qrcode';
import { format, parse } from 'date-fns';

import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

import { CarouselModule } from 'primeng/carousel';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

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
    DiscountAdminComponent,
    BookingComponent,
    TicketsComponent,
    DiscountPipe,
    ArrivalTimePipe,
    FormatFlightTime,
    FooterComponent,
    AddDiscountComponent,
    AircraftAdminComponent,
    AddAircraftComponent,

    FlightsAdminComponent,
    AddFlightComponent,

    AirportAdminComponent,
    AddAirportComponent,

    CheckInAdminComponent,
    AddCheckInComponent,
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
    MatAutocompleteModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MatCheckboxModule,
    HttpClientModule, // InputFlightSelectionFromHomePage,
    MatNativeDateModule,
    MatDatepickerModule,
    QrCodeModule,
    MatCardModule,
    MatListModule,
    CarouselModule,
    CardModule,
    ButtonModule,
    TagModule,
  ],
  providers: [provideAnimationsAsync(), provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
