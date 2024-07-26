import { Component, Input } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../../../utils/interface/Category';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {
  constructor(private api : ApiService, private router : Router){}

  collectionID!: number;

  addCategoryGroup = new FormGroup({
    name : new FormControl<string>("",[
      Validators.required,
      Validators.minLength(1)
    ])
  })

  onSubmit(){
    const category : Category = {
      id: 0,
      name: ''
    }

    category.name = this.addCategoryGroup.value.name ?? "";

    this.api.postCategory(category)
    .then(data =>{
      this.router.navigateByUrl("/items/"+this.collectionId)
    })
  }

  @Input() set collectionId(collectionId : number){
    this.collectionID = collectionId
  }
}
