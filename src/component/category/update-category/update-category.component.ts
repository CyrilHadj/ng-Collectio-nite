import { Component, Inject, Input } from '@angular/core';
import { Category } from '../../../utils/interface/Category';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { ApiService } from '../../../services/api.service';
import { Collection } from '../../../utils/interface/Collection';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddCategoryItemComponent } from '../add-category-item/add-category-item.component';

@Component({
  selector: 'app-update-category',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-category.component.html',
  styleUrl: './update-category.component.css'
})
export class UpdateCategoryComponent {

  collectionID : number | null = null;
  category : Category | null = null;

  updateCategoryForm = new FormGroup({
    name : new FormControl<string>(""),
  })

  constructor(
    private api : ApiService,
    private router : Router,
    public dialogRef: MatDialogRef<AddCategoryItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any
    ){}
  
  ngOnInit() : void{
    this.api.getCategoryById(this.data.categoryId)
    .then((category)=>{
      this.category = category
    })
  }

  onSubmit(){
    if(this.category){
      this.category.name = String(this.updateCategoryForm.value.name);

      this.api.updateCategory(this.category).then(data=>{
        this.dialogRef.close()
      })
    }
  }

}
