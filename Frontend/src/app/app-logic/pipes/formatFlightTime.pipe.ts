import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatFlightTime',
})
export class FormatFlightTime implements PipeTransform {
  transform(value: number): string {
    let hours = Math.floor(value / 60);
    // Round minutes to the nearest multiple of 5
    let roundedMinutes = Math.round((value % 60) / 5) * 5;

    if (roundedMinutes === 60) {
      hours += 1;
      roundedMinutes = 0;
    }

    if (roundedMinutes === 0) {
      return `${hours}h`;
    } else {
      return `${hours}h ${roundedMinutes}min`;
    }
  }
}
