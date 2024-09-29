import { Component } from '@angular/core';

import { ApiService } from '../../../services/api.service';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../utils/interface/User';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule , NgIf, RouterLink],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  constructor(private auth : AuthService, private router : Router, ){}

  user: User = {
    id: 0,
    name: '',
    email: '',
    password: ''
  };
  errorMessage : string = "";

  SignInForm = new FormGroup({
    email : new FormControl("",[
      Validators.required,
      Validators.email
    ]),
    password: new FormControl("",[
      Validators.required,
      Validators.minLength(8)
    ]),
  })

  onSubmit(){
    if(this.SignInForm.valid){
  
      this.user.email = this.SignInForm.value.email ?? "";
      this.user.password = this.SignInForm.value.password ?? "";

      this.auth.signin(this.user)
      .then(()=>{
        this.router.navigateByUrl("/")
      })
      .catch((error=>{
        this.errorMessage =   error.message;
        return;
      }))
    }
  }

}
