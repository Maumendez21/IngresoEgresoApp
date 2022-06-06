import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { IncomeEgress } from 'src/app/Models/ingresos-egresos.model';
import { AppState } from '../../app.reducer';

import { ChartData, ChartEvent, ChartType } from 'chart.js';
import { Subscription } from 'rxjs';
import { AppStateWithIncomeEgress } from '../income-egress.reducer';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.css']
})
export class EstadisticaComponent implements OnInit, OnDestroy {


  //Graphic

  public doughnutChartLabels: string[] = [ 'Egresos', 'Ingresos'];
  public doughnutChartData!: ChartData<'doughnut'>;
  public doughnutChartType: ChartType = 'doughnut';


  
  //End Graphic

  public ieSub!: Subscription;

  public income: number = 0;
  public egress: number = 0;
  
  public totalIncome: number = 0;
  public totalEgress: number = 0;

  constructor(
    private store: Store<AppStateWithIncomeEgress>
  ) { }
  ngOnDestroy(): void {
    this.ieSub.unsubscribe();
  }

  ngOnInit(): void {
    this.ieSub = this.store.select('incomeEgress')
    .subscribe(({items}) => this.generateStadistic(items))
  }

  public generateStadistic(items: IncomeEgress[]){
    this.income = 0;
    this.egress = 0;

    this.totalIncome = 0;
    this.totalEgress = 0;

    for (const item of items) {
      if (item.type === 'income') {
        this.totalIncome += item.amount;
        this.income++;
      }
      else{
        this.totalEgress += item.amount;
        this.egress++;
      }
    }

    this.doughnutChartData =  {
      labels: this.doughnutChartLabels,
      datasets: [
        { data: [ this.totalEgress, this.totalIncome ] },
      ]
    };
    
  }

}
