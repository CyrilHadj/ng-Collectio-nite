import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { Url } from '../../../utils/interface/Url';
import { Item } from '../../../utils/interface/Item';
import { Router } from '@angular/router';
import { Collection } from '../../../utils/interface/Collection';
import { ImageUploadComponent } from '../../image/image-upload/image-upload.component';
import { imageItemId } from '../../../utils/interface/imageItemId';

@Component({
  selector: 'app-update-item',
  standalone: true,
  imports: [ReactiveFormsModule,ImageUploadComponent],
  templateUrl: './update-item.component.html',
  styleUrl: './update-item.component.css'
})
export class UpdateItemComponent {
  routeCollectionId!: number;
  item!: Item; 
  imageUrl!: Url | void;

  receiveUrl($event: Url){
    console.log($event)
    this.imageUrl = $event
  };

  
  updateItemForm = new FormGroup({
    name : new FormControl<string>("",[
      Validators.required,
      Validators.minLength(1)
    ]),
  })

  constructor(private api : ApiService, private router : Router){}

  onSubmit(){
    if(this.item){
      this.item.name = this.updateItemForm.value.name ?? ""

      this.api.updateItem(this.item).then(data=>{
        
        const imageItemId : imageItemId = {
          itemId : this.item.id,
          url : JSON.stringify(this.imageUrl)
        }

        this.api.postImageToItem(imageItemId)

        this.router.navigateByUrl("/items/"+this.routeCollectionId)
      })
    }
  }

  @Input() set itemId(itemId : number){
    this.api.getItemById(itemId)
    .then(item=>{
      if(this.item){}
      this.item = item
    })
  }
  @Input() set collectionId(collectionId : number){
    this.routeCollectionId = collectionId;
  }
}
