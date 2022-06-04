import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Subscription } from 'rxjs';
import { AppState } from '../app.reducer';
import * as ieAc from '../ingreso-egreso/income-egress.action';
import { IncomeEgressService } from '../Services/income-egress.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  public userSubs!: Subscription;
  public itemsSubs!: Subscription;

  constructor(
    private store: Store<AppState>,
    private ieService: IncomeEgressService
  ) { }

  ngOnDestroy(): void {
    this.userSubs.unsubscribe();
    this.itemsSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.userSubs = this.store.select('user')
    .pipe(
      filter(auth => auth.user != null)
    )
    .subscribe(user => {
      this.itemsSubs = this.ieService.initIncomeEgress(user.user?.uid || '')
      .subscribe(items => {

        // Se envía la acción al store
        console.log(items);
        this.store.dispatch(ieAc.setItems({items}))



      })
    })
  }



}
