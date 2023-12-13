import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initiales',
  standalone: true
})
export class InitialesPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    if (!value) {
      return '..';
    }

    const mots = value.split(' ').slice(0, 2);
    const initiales = mots.map(mot => mot.charAt(0)).join('');

    return initiales;
  }

}
