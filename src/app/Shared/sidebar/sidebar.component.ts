import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthService,
              private router: Router,
              private store: Store<AppState>) { }
  ngOnDestroy(): void {
    this.ieSub.unsubscribe();
  }

  public name!: string;
  public ieSub!: Subscription;

  ngOnInit(): void {
    this.ieSub = this.store.select('user')
    .pipe(
      filter(auth => auth.user != null)
    )
    .subscribe(({user}) => {
      this.name = user?.name || '';
    })
  }

  public logout(){
    this.authService.logout()
    .then(() => {
      this.router.navigateByUrl('/login');
    })
  }

}
