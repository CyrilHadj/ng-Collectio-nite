import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { User } from '../../../utils/interface/User';
import { Url } from '../../../utils/interface/Url';
import { ImageUploadComponent } from '../../image/image-upload/image-upload.component';
import { AuthService } from '../../../services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule, NgIf],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  
  constructor(private api : ApiService, private router : Router, 
    public dialog : MatDialog, 
    private auth : AuthService
  ){}
  errorMessage : string = "";
  imageUrl!: string;
  user: User = {
    id: 0,
    name: '',
    email: '',
    password: ''
  }

  SignUpForm = new FormGroup({
    name: new FormControl("",[
      Validators.required
    ]),
    email : new FormControl("",[
      Validators.required,
      Validators.email
    ]),
    password : new FormControl<string>("",[
      Validators.required,
      Validators.minLength(8)
    ])
  })

  openImageDialog() {
    const dialogRef = this.dialog.open(ImageUploadComponent,{
      width: "50vw",
    })
    dialogRef.afterClosed().subscribe(result =>{

      if(result){
        this.imageUrl = result.url
      }
    })
  }

  onSubmit(){

    if(this.user){

      this.user.name = this.SignUpForm.value.name ?? "";
      this.user.email = this.SignUpForm.value.email ?? "";
      this.user.password = this.SignUpForm.value.password ?? "";

      this.auth.signup(this.user).then((user)=>{
        if(this.imageUrl){
        const postImage = {
          url : this.imageUrl,
          userId : user.id
        }

        this.auth.userAddImage(postImage).catch(error=>{
          this.errorMessage = "Erreur lors de l'ajout de l'image";
        })
      }
      this.router.navigateByUrl("/")
      })
      .catch((error=>{
        this.errorMessage = "Erreur lors de la création du compte: " + error.message;
      }))
      

    }

  }

}
