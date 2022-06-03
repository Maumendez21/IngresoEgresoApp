import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import Swal from 'sweetalert2'

// NGRX
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as ui from '../../Shared/ui.action';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, 
              private authService: AuthService, 
              private router: Router,
              private store: Store<AppState>) { }

  public formLogin!: FormGroup;
  public loading = false;
  public uiSubscription!: Subscription;

  ngOnInit(): void {

    if( this.authService.isAuth() ){ this.router.navigateByUrl('/'); }

    this.formLogin = this.fb.group({
      email:    ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    this.uiSubscription = this.store.select('ui').subscribe(ui => this.loading = ui.isLoading);
  }


  public login(){
    if ( this.formLogin.invalid ){ return; }
    const { email, password } = this.formLogin.value;


    this.store.dispatch(ui.isLoading());

    // Swal.fire({
    //   title: 'Please Await',
    //   didOpen: () => {
    //     Swal.showLoading()
        
    //   }
    // })

    this.authService.login(email, password)
    .then(login => {

      // Swal.close();
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
