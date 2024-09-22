import { Component, Inject, Input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';
import { Item } from '../../../utils/interface/Item';
import { Collection } from '../../../utils/interface/Collection';
import { ImageUploadComponent } from '../../image/image-upload/image-upload.component';
import { Url } from '../../../utils/interface/Url';
import { imageItemId } from '../../../utils/interface/imageItemId';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ImageSliderModelComponent } from '../../Model/image-slider-model/image-slider-model.component';

@Component({
  selector: 'app-add-item',
  standalone: true,
  imports: [ReactiveFormsModule,ImageUploadComponent],
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.css'
})
export class AddItemComponent {

  imageUrl!: Url | void;

  addItemGroup = new FormGroup({
    name : new FormControl<string>("",[
      Validators.required,
      Validators.minLength(1)
    ])
  })
  
  constructor(
    private api : ApiService,
      private router : Router,
      public dialog : MatDialog,
      public dialogRef: MatDialogRef<AddItemComponent>,
      @Inject(MAT_DIALOG_DATA) public data : any
    ){}
  collection!: Collection;

  ngOnInit(){
    this.api.getCollection(this.data.collectionId)
    .then(collection =>{
      this.collection = collection
    })
   
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


  onSubmit(){
    const item : Item={
      id: 0,
      name: "",
      CategoryId: 0
    }
      item.name = this.addItemGroup.value.name ?? "";

      this.api.postCollectionItem(this.collection.id, item)
      .then(item=>{
        if(this.imageUrl){
        const imageItemId : imageItemId = {
          itemId : item.id,
          url : this.imageUrl
        }
        this.api.postImageToItem(imageItemId)
        this.dialogRef.close(
          { status: 'confirmed' }
        );
      }
    
      })
    
  }


}
