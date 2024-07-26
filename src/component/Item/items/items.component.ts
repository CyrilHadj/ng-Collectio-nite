import { Component, Input } from '@angular/core';
import { Collection } from '../../../utils/interface/Collection';
import { ApiService } from '../../../services/api.service';
import {MatButtonModule} from '@angular/material/button';
import { Item } from '../../../utils/interface/Item';
import { Router, RouterModule } from '@angular/router';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

import { AddItemComponent } from '../add-item/add-item.component';
import { UpdateItemComponent } from '../update-item/update-item.component';
import { UpdateCollectionComponent } from "../../Collection/update-collection/update-collection.component";
@Component({
  selector: 'app-items',
  standalone: true,
  imports: [
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    AddItemComponent,
    UpdateItemComponent,
    UpdateCollectionComponent
],

  templateUrl: './items.component.html',
  styleUrl: './items.component.css'
})
export class ItemsComponent {

  constructor(private api : ApiService, private router : Router){}

  items : Item[] = [];
  collection!: Collection;

  public deleteItem(itemId : number) : void{
    this.api.deleteItem(itemId)
    .then(data=>{
      console.log(data)
      this.getItems(this.collection.id)
    })
  }
  
  public submit(collectionId : number){
    this.getItems(collectionId)
  }

  public getItems(id : number){
    this.api.getCollectionItems(id).then(items =>{
      this.items = items
    })
  }

  
  @Input() set collectionId(collectionId : number){
    this.api.getCollection(collectionId)
    .then(collection=>{
      this.collection = collection
    })

    this.getItems(collectionId)
  }
}
