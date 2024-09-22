import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { Collection } from '../../../utils/interface/Collection';
import { Router, RouterLink } from '@angular/router';
import { ImageUploadComponent } from '../../image/image-upload/image-upload.component';

import { imageCollectionId } from '../../../utils/interface/imageCollectionId';
import { Url } from '../../../utils/interface/Url';
import { MatDialog } from '@angular/material/dialog';
import { ImageSliderModelComponent } from '../../Model/image-slider-model/image-slider-model.component';

@Component({
  selector: 'app-add-collection',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule,ImageUploadComponent],
  templateUrl: './add-collection.component.html',
  styleUrl: './add-collection.component.css'
})
export class AddCollectionComponent {
  imageUrl!: Url | void;

  addCollectionGroup = new FormGroup({
    name : new FormControl<string>(""),
    description : new FormControl<string>(""),
  })

  constructor(private api : ApiService, private router : Router, public dialog : MatDialog){}
  collection : Collection={
    id: 0,
    name: "",
    description: "",
    ImageId: 0,
  }

  openImageDialog() {
    const dialogRef = this.dialog.open(ImageUploadComponent,{
      width: "50vw",
    })
    dialogRef.afterClosed().subscribe(result =>{

      if(result){
        this.imageUrl = result.url
      }
    })
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
        if(this.imageUrl){
        const imageCollectionId : imageCollectionId = {
          collectionId : collection.id,
          url : this.imageUrl
        }
        this.api.postimageToCollection(imageCollectionId)
      }
      this.router.navigateByUrl("/collections")
      })

    }
  }


}
