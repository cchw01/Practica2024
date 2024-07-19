import { Component, Input, OnInit } from '@angular/core';
import { FlightItem } from '../../../app-logic/models/flight-item';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrl: './flight.component.css',
})
export class FlightComponent{
  @Input() flightItem!: FlightItem;
  
}
