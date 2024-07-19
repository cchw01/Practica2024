import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrival',
})
export class ArrivalTimePipe implements PipeTransform {
  transform(value: Date, flightTime: number) {
    let arrivalTime = new Date(value);

    // Add the flight time (in minutes)
    arrivalTime.setMinutes(arrivalTime.getMinutes() + flightTime);

    // Return the new Date object
    return arrivalTime;
  }
}
