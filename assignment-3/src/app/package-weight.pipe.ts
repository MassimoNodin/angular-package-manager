import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'packageWeight',
  standalone: true
})
export class PackageWeightPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    return value * 1000 + "g";
  }

}
