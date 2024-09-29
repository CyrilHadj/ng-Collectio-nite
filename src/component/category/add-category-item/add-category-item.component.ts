import { Component, Inject, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';
import { Category } from '../../../utils/interface/Category';
import { CategoryAndItemId } from '../../../utils/interface/CategoryAndItemId';
import { Item } from '../../../utils/interface/Item';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgFor } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-add-category-item',
  standalone: true,
  imports: [ReactiveFormsModule,NgFor],
  templateUrl: './add-category-item.component.html',
  styleUrl: './add-category-item.component.css'
})
export class AddCategoryItemComponent {

  itemAndCategoryId! : CategoryAndItemId

  categoryId! : number
  item! : Item
  categories! : Category[]
  routeCollectionId!: number;

  constructor(
    private api : ApiService,
    private router : Router,
    private auth : AuthService,
    public dialogRef: MatDialogRef<AddCategoryItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any
  ){}

  categoryGroup = new FormGroup({
    categoryId : new FormControl<number>(0,[
      Validators.required,
    ])
  }) 

  onSubmit(){
   this.categoryId= this.categoryGroup.value.categoryId ?? 0;

   this.itemAndCategoryId = {
    itemId : this.item.id,
    CategoryId : this.categoryId
   }
  
   this.api.addCategoryToItem(this.itemAndCategoryId).then(data=>{
    this.dialogRef.close()
   })
  }

  ngOnInit() : void{
    this.api.getItemById(this.data.itemId)
    .then((item)=>{
      this.item = item
    })
    .then(()=>{
      this.getCategories()
    })
   
  }
  
  public getCategories(){
    const token = this.auth.getPayload()
    if(!token){
      return
    }
    this.api.getCategoryByUser(token.id)
    .then((categories)=>{
      this.categories = categories
    })
  }

}
