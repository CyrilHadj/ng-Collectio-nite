import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { Collection } from '../../../utils/interface/Collection';
import { Router, RouterLink } from '@angular/router';
import { ImageUploadComponent } from '../../image/image-upload/image-upload.component';

import { imageCollectionId } from '../../../utils/interface/imageCollectionId';
import { Url } from '../../../utils/interface/Url';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../../services/auth.service';
import { CollectionToUser } from '../../../utils/interface/CollectionToUser';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-add-collection',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule,ImageUploadComponent,NgIf,NgClass],
  templateUrl: './add-collection.component.html',
  styleUrl: './add-collection.component.css'
})
export class AddCollectionComponent {
  imageUrl!: Url | void;

  addCollectionGroup = new FormGroup({
    name : new FormControl<string>("",[
      Validators.required,
      Validators.minLength(3)
    ]),
    description : new FormControl<string>("",[
      Validators.required,
      Validators.minLength(3)
    ]),
  })

  constructor(private api : ApiService, 
     private router : Router,
     public dialog : MatDialog,
     private auth : AuthService,
     public dialogRef: MatDialogRef<AddCollectionComponent>,
     @Inject(MAT_DIALOG_DATA) public data : any
    ){}
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
      if(this.addCollectionGroup.invalid){
        return
      }
      this.collection.name = this.addCollectionGroup.value.name!;
      this.collection.description = this.addCollectionGroup.value.description!;
      
      const token = this.auth.getPayload()
      if(!token){
        return 
      }
      const postCollection : CollectionToUser = {
        userId: token.id,
        name: this.collection.name,
        description: this.collection.description
      }
      console.log(postCollection)
      this.api.postCollectionToUser(postCollection)
      .then(collection=>{
        if(this.imageUrl){
        const imageCollectionId : imageCollectionId = {
          collectionId : collection.id,
          url : this.imageUrl
        }
        this.api.postimageToCollection(imageCollectionId)
      }
      this.dialogRef.close()
      })
  }
}
