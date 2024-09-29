import { Component, Inject, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { Url } from '../../../utils/interface/Url';
import { Item } from '../../../utils/interface/Item';
import { Router } from '@angular/router';
import { Collection } from '../../../utils/interface/Collection';
import { ImageUploadComponent } from '../../image/image-upload/image-upload.component';
import { imageItemId } from '../../../utils/interface/imageItemId';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { updateImageItem } from '../../../utils/interface/itemAndImageId';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-update-item',
  standalone: true,
  imports: [ReactiveFormsModule,ImageUploadComponent,NgIf],
  templateUrl: './update-item.component.html',
  styleUrl: './update-item.component.css'
})
export class UpdateItemComponent {
  routeCollectionId!: number;
  item!: Item; 
  imageUrl!: string;

  ngOnInit(){
    this.api.getItemById(this.data.itemId)
    .then((item)=>{
      this.item = item
      console.log(item)
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

  
  updateItemForm = new FormGroup({
    name : new FormControl<string>("",[
      Validators.required,
      Validators.minLength(1)
    ]),
  })

  constructor(
    private api : ApiService,
    private router : Router,
    public dialog : MatDialog,
    public dialogRef: MatDialogRef<UpdateItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any
    ){}

  onSubmit(){
    if(this.item){
      this.item.name = this.updateItemForm.value.name ?? ""

      this.api.updateItem(this.item).then(data=>{
        this.api.getImageByItem(this.item.id)
        .then((images)=>{
          const imageAndItemId : updateImageItem = {
            itemId: this.item.id,
            imageId: images[0].id,
            url: this.imageUrl
          }
          console.log(imageAndItemId)
          this.api.updateImageItem(imageAndItemId)
        })
      this.dialogRef.close()
      })
    }
  }


}
