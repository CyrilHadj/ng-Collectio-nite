import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';
import { Item } from '../../../utils/interface/Item';
import { Collection } from '../../../utils/interface/Collection';


@Component({
  selector: 'app-add-item',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.css'
})
export class AddItemComponent {
  addItemGroup = new FormGroup({
    name : new FormControl<string>("")
  })
  constructor(private api : ApiService, private router : Router){}
  collection!: Collection;

  
  item : Item={
    id : 0,
    name : ""
  }

  onSubmit(){
    if(this.item){
      if(!this.addItemGroup.value.name)return;
      
      this.item.name = this.addItemGroup.value.name;

      
    }

  }

  @Input()set collectionId(collectionId : number){
   this.api.getCollection(collectionId)
   .then(collection=>{
    this.collection = collection
   })
   
  }
}
