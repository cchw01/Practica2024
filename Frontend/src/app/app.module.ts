import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './menu-items/home-page/home-page.component';
import { ContactComponent } from './menu-items/contact/contact.component';
import { LoginComponent } from './menu-items/login/login.component';
import { CheckInComponent } from './menu-items/check-in/check-in.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlightsComponent } from './menu-items/flights/flights.component';
import { FlightComponent } from './menu-items/flights/flight/flight.component';
import { DiscountPipe } from './app-logic/pipes/discountPrice.pipe';
import { ArrivalTimePipe } from './app-logic/pipes/arrivalTime.pipe';

import { MatIconModule } from '@angular/material/icon';
import { FormatFlightTime } from './app-logic/pipes/formatFlightTime.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ContactComponent,
    LoginComponent,
    CheckInComponent,
    FlightsComponent,
    FlightComponent,
    DiscountPipe,
    ArrivalTimePipe,
    FormatFlightTime
  ],
  imports: [BrowserModule, AppRoutingModule, MatToolbarModule, MatIconModule],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
