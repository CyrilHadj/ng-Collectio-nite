import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { Collection } from '../../../utils/interface/Collection';
import { Router } from '@angular/router';
import { ImageUploadComponent } from '../../image/image-upload/image-upload.component';
import { Url } from '../../../utils/interface/Url';
import { imageCollectionId } from '../../../utils/interface/imageCollectionId';
@Component({
  selector: 'app-update-collection',
  standalone: true,
  imports: [ReactiveFormsModule,ImageUploadComponent],
  templateUrl: './update-collection.component.html',
  styleUrl: './update-collection.component.css'
})
export class UpdateCollectionComponent {

  imageUrl!: Url | void;

  receiveUrl($event: Url){
    console.log($event)
    this.imageUrl = $event
  }


  collection : Collection | null = null;

  updateCollectionForm = new FormGroup({
    name : new FormControl<string>(""),
    description : new FormControl<string>("")
  })

  constructor(private api : ApiService, private router : Router){}

  onSubmit(){
    if(this.collection){
      this.collection.name = String(this.updateCollectionForm.value.name);
      this.collection.description = String(this.updateCollectionForm.value.description);
      
      this.api.updateCollection(this.collection).then(data=>{
        if(this.collection){
        const imageCollectionId : imageCollectionId = {
          collectionId : this.collection.id,
          url : JSON.stringify(this.imageUrl)
        }
        this.api.postimageToCollection(imageCollectionId)
        .then(res=>this.router.navigateByUrl("/collections"))
        
      }

      })
    }

    
  }

  @Input() set collectionId(collectionId : number){
    this.api.getCollection(collectionId).then(collection =>{
      this.collection = collection
    })
    .catch(error => console.log(error))
  }

}
