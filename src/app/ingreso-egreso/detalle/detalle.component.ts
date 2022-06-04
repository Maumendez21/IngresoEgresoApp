import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { IncomeEgress } from 'src/app/Models/ingresos-egresos.model';
import { IncomeEgressService } from '../../Services/income-egress.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit, OnDestroy {

  public incomeEgress: IncomeEgress[] = [];
  public ieSubs!: Subscription;

  constructor(
    private store: Store<AppState>,
    private ieService: IncomeEgressService
  ) { }

  ngOnDestroy(): void {
    this.ieSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.ieSubs = this.store.select('incomeEgress')
    .subscribe(({items}) => this.incomeEgress = items);
  }

  public delete(uid: string){
    console.log(uid);
    this.ieService.deleteItem(uid)
    .then( () => Swal.fire('Deleted!', 'Item deleted.', 'success'))
    .catch( err => Swal.fire('Ups! :(', '' + err.message, 'error'))
    
    
  }

}
