import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';
import { Category } from '../../../utils/interface/Category';
import { CategoryAndItemId } from '../../../utils/interface/CategoryAndItemId';
import { Item } from '../../../utils/interface/Item';

@Component({
  selector: 'app-add-category-item',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-category-item.component.html',
  styleUrl: './add-category-item.component.css'
})
export class AddCategoryItemComponent {

  itemAndCategoryId! : CategoryAndItemId

  categoryId! : number
  item! : Item
  categories! : Category[]
  routeCollectionId!: number;

  constructor(private api : ApiService, private router : Router){}

  categoryGroup = new FormGroup({
    categoryId : new FormControl<number>(0,[
      Validators.required,
    ])
  }) 

  onSubmit(){
   this.categoryId= this.categoryGroup.value.categoryId ?? 0;
    console.log(this.categoryId)
   this.itemAndCategoryId = {
    itemId : this.item.id,
    CategoryId : this.categoryId
   }
  
   this.api.addCategoryToItem(this.itemAndCategoryId).then(data=>{
    this.router.navigateByUrl("/items/"+this.routeCollectionId)
   })
  }

  ngOnInit() : void{
    this.getCategories()
  }
  
  public getCategories(){
    this.api.getCategories().then(categories=>{
      this.categories = categories
    })
  };

  @Input()set itemId(itemId : number){
    this.api.getItemById(itemId)
    .then(item=>{
      this.item = item
    })
  };

  @Input() set collectionId(collectionId : number){
    this.routeCollectionId = collectionId;
  };

}
