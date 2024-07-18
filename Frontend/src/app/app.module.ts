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
import { UserProfileComponent } from './menu-items/user-profile/user-profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { RegisterComponent } from './menu-items/register/register.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FlightsComponent } from './menu-items/flights/flights.component';
import { FlightComponent } from './menu-items/flights/flight/flight.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatInputModule,
    PasswordModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
