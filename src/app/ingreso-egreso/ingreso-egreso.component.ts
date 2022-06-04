import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IncomeEgress } from '../Models/ingresos-egresos.model';
import { IncomeEgressService } from '../Services/income-egress.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Subscription } from 'rxjs';
import * as ui from '../Shared/ui.action';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styleUrls: ['./ingreso-egreso.component.css']
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  public ieForm!: FormGroup;
  public type: string = 'income';

  public loading = false;
  public uiSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private incomeEgressService: IncomeEgressService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.ieForm = this.fb.group({
      description: ['', Validators.required],
      amount: ['', Validators.required]

    });

    this.uiSubscription = this.store.select('ui').subscribe(ui => this.loading = ui.isLoading);
  }

  public save(){

    if(this.ieForm.invalid){return;}
    const { description, amount } = this.ieForm.value;
    const incomeEgress = new IncomeEgress(description, amount, this.type);
    
    this.store.dispatch(ui.isLoading());

    this.incomeEgressService.createIncomeEgress(incomeEgress)
    .then((ref) => {
      console.log(ref);
      
      this.ieForm.reset();
      this.store.dispatch(ui.stopLoading());
      Swal.fire('Added!', description, 'success');
    })
    .catch(err => {
      this.store.dispatch(ui.stopLoading());
      Swal.fire('Error!', err.message, 'error');
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.uiSubscription.unsubscribe();
  }

}
