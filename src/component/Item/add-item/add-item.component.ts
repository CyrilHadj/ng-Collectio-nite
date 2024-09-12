import { Component, Input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';
import { Item } from '../../../utils/interface/Item';
import { Collection } from '../../../utils/interface/Collection';
import { ImageUploadComponent } from '../../image/image-upload/image-upload.component';
import { Url } from '../../../utils/interface/Url';
import { imageItemId } from '../../../utils/interface/imageItemId';

@Component({
  selector: 'app-add-item',
  standalone: true,
  imports: [ReactiveFormsModule,ImageUploadComponent],
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.css'
})
export class AddItemComponent {

  imageUrl!: Url | void;

  receiveUrl($event: Url){
    console.log($event)
    this.imageUrl = $event
  };

  addItemGroup = new FormGroup({
    name : new FormControl<string>("",[
      Validators.required,
      Validators.minLength(1)
    ])
  })
  
  constructor(private api : ApiService, private router : Router){}
  collection!: Collection;

  
 
  public onAddItem = output<number>();

  onSubmit(){
    const item : Item={
      id: 0,
      name: "",
      CategoryId: 0
    }
      item.name = this.addItemGroup.value.name ?? "";

      this.api.postCollectionItem(this.collection.id, item)
      .then(item=>{
        const imageItemId : imageItemId = {
          itemId : item.id,
          url : JSON.stringify(this.imageUrl)
        }
        this.api.postImageToItem(imageItemId)
        this.onAddItem.emit(this.collection.id);
      })
    
  }

  @Input()set collectionId(collectionId : number){
   this.api.getCollection(collectionId)
   .then(collection=>{
    this.collection = collection
   })
   
  }
}
