import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  public formRegister!: FormGroup;

  constructor(private fb: FormBuilder, 
              private authService: AuthService, 
              private router: Router) { }

  ngOnInit(): void {

    // if( this.authService.isAuth() ){ this.router.navigateByUrl('/'); }

    this.formRegister = this.fb.group({
      name:     ['', Validators.required],
      email:    ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })


  }

  public createUser(){

    if ( this.formRegister.invalid ){ return; }

    const { name, email, password } = this.formRegister.value;

    Swal.fire({
      title: 'Please Await',
      didOpen: () => {
        Swal.close();
        Swal.showLoading()
        
      }
    })

    this.authService.createUser(name, email, password)
    .then(credentials => {
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
