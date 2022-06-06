import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { IngresoEgresoComponent } from './ingreso-egreso.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { DetalleComponent } from './detalle/detalle.component';
import { OrderIncomePipe } from '../Pipes/order-income.pipe';
import { SharedModule } from '../Shared/shared.module';
import { RouterModule } from '@angular/router';
import { DashboardRoutesMModule } from '../dashboard/dashboard-routes-m.module';
import { StoreModule } from '@ngrx/store';
import { _incomeEgressReducer } from './income-egress.reducer';




@NgModule({
  declarations: [
    DashboardComponent,
    IngresoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent,
    OrderIncomePipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgChartsModule,
    SharedModule,
    RouterModule,
    StoreModule.forFeature('incomeEgress', _incomeEgressReducer)

  ]
})
export class IngresoEgresoModule { }
