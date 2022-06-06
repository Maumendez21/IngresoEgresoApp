import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router, CanLoad } from '@angular/router';
import { Observable, take, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService, 
              private router: Router  ) {}

  canActivate() : Observable<boolean> {
    return this.authService.isAuth().pipe(
      tap(state => {
        if  (!state){this.router.navigateByUrl('/login')}
      })
    );
  }


  canLoad() : Observable<boolean> {
    return this.authService.isAuth().pipe(
      tap(state => {
        if  (!state){this.router.navigateByUrl('/login')}
      }),
      take(1)
    );
  }
  
}
