import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, 
              private authService: AuthService, 
              private router: Router) { }

  public formLogin!: FormGroup;

  ngOnInit(): void {

    if( this.authService.isAuth() ){ this.router.navigateByUrl('/'); }


    this.formLogin = this.fb.group({
      email:    ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  }


  public login(){
    if ( this.formLogin.invalid ){ return; }
    const { email, password } = this.formLogin.value;

    Swal.fire({
      title: 'Please Await',
      didOpen: () => {
        Swal.showLoading()
        
      }
    })

    this.authService.login(email, password)
    .then(login => {

      Swal.close();
      this.router.navigate(['/']);

    })
    .catch(error => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '' + error.message,
      })
    });
  }


}
