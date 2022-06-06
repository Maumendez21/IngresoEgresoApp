import { Routes, RouterModule, CanActivate } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { dashboardRoutes } from './dashboard/dashboard.routes';
import { AuthGuard } from './Services/auth.guard';
import { DashboardRoutesMModule } from './dashboard/dashboard-routes-m.module';



const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {
        path: '',
        canLoad: [AuthGuard],
        loadChildren: () => import('./ingreso-egreso/ingreso-egreso.module')
        .then(m => m.IngresoEgresoModule)
    },
    // { 
    //     path: '', 
    //     component: DashboardComponent,
    //     canActivate: [AuthGuard],
    //     children: dashboardRoutes
        
    // },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes), DashboardRoutesMModule],
    exports: [RouterModule]
})
export class AppRoutingModule {}
