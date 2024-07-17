import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  formData: { [key: string]: any } = {
    departingairport: '',
    destinationAirport: '',
    departingTime: '',
    returnTime: '',
    passengers: 1,
  };

  onInputChange(event: Event, field: string) {
    const target = event.target as HTMLInputElement;
    this.formData[field] = target.value;
  }

  onSubmit() {
    // Logica pentru submit
    console.log(this.formData);
  }
}
