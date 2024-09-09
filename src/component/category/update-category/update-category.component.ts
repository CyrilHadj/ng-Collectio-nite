import { Component, Input } from '@angular/core';
import { Category } from '../../../utils/interface/Category';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { ApiService } from '../../../services/api.service';
import { Collection } from '../../../utils/interface/Collection';
import { Router } from '@angular/router';

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

  constructor(private api : ApiService, private router : Router){}

  onSubmit(){
    if(this.category){
      this.category.name = String(this.updateCategoryForm.value.name);

      this.api.updateCategory(this.category).then(data=>{
        this.router.navigateByUrl("/items/"+this.collectionID)
      })
    }
  }

  @Input() set categoryId(categoryId : number){
    this.api.getCategoryById(categoryId).then(category=>{
      this.category = category
    })
    .catch(error => console.log(error))
  }

  @Input() set collectionId(collectionId : number){
      this.collectionID = collectionId
  }
}
