import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discount',
})
export class DiscountPipe implements PipeTransform {
  transform(value: number, discountPercentage: number): number {
    return value - (value * discountPercentage) / 100;
  }
}
