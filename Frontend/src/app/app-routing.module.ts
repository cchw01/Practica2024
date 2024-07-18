import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './menu-items/home-page/home-page.component';
import { ContactComponent } from './menu-items/contact/contact.component';
import { LoginComponent } from './menu-items/login/login.component';
import { CheckInComponent } from './menu-items/check-in/check-in.component';
import { UserProfileComponent } from './menu-items/user-profile/user-profile.component';
import { FlightsComponent } from './menu-items/flights/flights.component';
import { AircraftComponent } from './menu-items/aircraft-list/aircraft-list.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'check-in', component: CheckInComponent },
  { path: 'login', component: LoginComponent },
  {path: 'user', component: UserProfileComponent},
  { path: 'flights', component: FlightsComponent },
  { path : 'aircraft', component: AircraftComponent},
  // For wildcard route we could either redirect to the home page or to some NotFoundComponent
  { path: '**', redirectTo: '' },];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
