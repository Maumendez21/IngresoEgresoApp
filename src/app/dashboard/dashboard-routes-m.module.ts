import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AuthGuard } from '../Services/auth.guard';
import { dashboardRoutes } from './dashboard.routes';

const childRoutes: Routes = [
  { 
        path: '', 
        component: DashboardComponent,
        canActivate: [AuthGuard],
        children: dashboardRoutes
        
    },
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(childRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutesMModule { }
