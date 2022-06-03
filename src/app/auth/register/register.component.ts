import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../Services/auth.service';

//NGRX
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as ui from '../../Shared/ui.action';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {


  public formRegister!: FormGroup;
  public loading = false;
  public uiSubscription!: Subscription;

  constructor(private fb: FormBuilder, 
              private authService: AuthService, 
              private router: Router,
              private store: Store<AppState>) { }

  ngOnInit(): void {

    // if( this.authService.isAuth() ){ this.router.navigateByUrl('/'); }

    this.formRegister = this.fb.group({
      name:     ['', Validators.required],
      email:    ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })

    this.uiSubscription = this.store.select('ui').subscribe(ui => this.loading = ui.isLoading);

  }

  public createUser(){

    if ( this.formRegister.invalid ){ return; }

    const { name, email, password } = this.formRegister.value;
    this.store.dispatch(ui.isLoading());

    // Swal.fire({
    //   title: 'Please Await',
    //   didOpen: () => {
    //     Swal.close();
    //     Swal.showLoading()
        
    //   }
    // })

    this.authService.createUser(name, email, password)
    .then(credentials => {
      this.store.dispatch(ui.stopLoading());
      this.router.navigate(['/']);
    })
    .catch(error => {
      this.store.dispatch(ui.stopLoading());
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '' + error.message,
      })
    });
    
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.uiSubscription.unsubscribe();
  }

}
