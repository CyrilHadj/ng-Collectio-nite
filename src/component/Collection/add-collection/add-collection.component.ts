import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { Collection } from '../../../utils/interface/Collection';
import { Router, RouterLink } from '@angular/router';
import { ImageUploadComponent } from '../../image/image-upload/image-upload.component';

import { imageCollectionId } from '../../../utils/interface/imageCollectionId';
import { Url } from '../../../utils/interface/Url';

@Component({
  selector: 'app-add-collection',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule,ImageUploadComponent],
  templateUrl: './add-collection.component.html',
  styleUrl: './add-collection.component.css'
})
export class AddCollectionComponent {
  imageUrl!: Url | void;

  receiveUrl($event: Url){
    console.log($event)
    this.imageUrl = $event
  }
 
  addCollectionGroup = new FormGroup({
    name : new FormControl<string>(""),
    description : new FormControl<string>(""),
  })

  constructor(private api : ApiService, private router : Router){}
  collection : Collection={
    id: 0,
    name: "",
    description: "",
    ImageId: 0
  }

  ngOnInit(){

  }

  onSubmit(){
    if(this.collection){
      if(!this.addCollectionGroup.value.name)return;
      if(!this.addCollectionGroup.value.description)return;

      this.collection.name = this.addCollectionGroup.value.name;
      this.collection.description = this.addCollectionGroup.value.description;
      
      
      this.api.postCollection(this.collection)
      .then(collection=>{
        const imageCollectionId : imageCollectionId = {
          collectionId : collection.id,
          url : JSON.stringify(this.imageUrl)
        }
        this.api.postimageToCollection(imageCollectionId)
        .then(res=>this.router.navigateByUrl("/collections"))
        
      })

    }
  }


}
