import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyXOF',
  standalone: true
})
export class CurrencyXOFPipe implements PipeTransform {

  transform(amount: number): string {
    const formatted = amount.toLocaleString('fr-FR', { style: 'currency', currency: 'XOF' });
    return formatted.replace(/,/g, ' ');
  }

}
