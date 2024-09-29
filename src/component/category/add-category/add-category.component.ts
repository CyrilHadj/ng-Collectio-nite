import { Component, Inject, Input } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../../../utils/interface/Category';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryToUser } from '../../../utils/interface/CategoryToUser';
@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {
  constructor(
    private api : ApiService,
    private router : Router,
    private auth : AuthService,
    public dialogRef: MatDialogRef<AddCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any
  ){}

  addCategoryGroup = new FormGroup({
    name : new FormControl<string>("",[
      Validators.required,
      Validators.minLength(1)
    ])
  })

  onSubmit(){
 
    const token = this.auth.getPayload()
    if(!token){
      return
    }

    const CategoryUser : CategoryToUser = {
      userId: token.id,
      name: this.addCategoryGroup.value.name ?? ""
    }

    this.api.postCategoryToUser(CategoryUser)
    .then(()=>{
      this.dialogRef.close(
        { status: 'confirmed' }
      );
    })

  }

}
