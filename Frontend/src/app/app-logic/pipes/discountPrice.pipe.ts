import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discount',
})
export class DiscountPipe implements PipeTransform {
  transform(value: number, discountPercentage: number): number {
    if (discountPercentage === 0) {
      return value; // Nu aplicăm niciun discount
    }
    return value - (value * discountPercentage) / 100;
  }
}
