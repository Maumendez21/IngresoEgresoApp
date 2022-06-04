import { Pipe, PipeTransform } from '@angular/core';
import { IncomeEgress } from '../Models/ingresos-egresos.model';

@Pipe({
  name: 'orderIncome'
})
export class OrderIncomePipe implements PipeTransform {

  transform(items: IncomeEgress[]): IncomeEgress[] {
    return items.slice().sort((a, i) => {
      if (a.type === 'income') {
        return -1
      }else {

        return 1
      }
    });
  }

}
