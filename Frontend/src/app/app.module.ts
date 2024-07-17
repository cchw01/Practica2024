import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './menu-items/home-page/home-page.component';
import { ContactComponent } from './menu-items/contact/contact.component';
import { LoginComponent } from './menu-items/login/login.component';
import { CheckInComponent } from './menu-items/check-in/check-in.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatToolbarModule} from '@angular/material/toolbar';
import { UserProfileComponent } from './menu-items/user-profile/user-profile.component';
import { BookingComponent } from './menu-items/booking/booking.component'

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ContactComponent,
    LoginComponent,
    CheckInComponent,
    UserProfileComponent,
    BookingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
