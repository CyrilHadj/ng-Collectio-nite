import { Component, Inject, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { Collection } from '../../../utils/interface/Collection';
import { Router } from '@angular/router';
import { ImageUploadComponent } from '../../image/image-upload/image-upload.component';
import { Url } from '../../../utils/interface/Url';
import { imageCollectionId } from '../../../utils/interface/imageCollectionId';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-update-collection',
  standalone: true,
  imports: [ReactiveFormsModule,ImageUploadComponent,],
  templateUrl: './update-collection.component.html',
  styleUrl: './update-collection.component.css'
})
export class UpdateCollectionComponent {

  imageUrl!: Url | void;

  collection : Collection = {
    id: 0,
    name: '',
    description: '',
    ImageId: 0
  };

  updateCollectionForm = new FormGroup({
    name : new FormControl<string>(""),
    description : new FormControl<string>("")
  })

  ngOnInit(){
      this.api.getCollection(this.data.id)
      .then((collection)=>{
        this.collection = collection
      })
  }

  constructor(
    private api : ApiService,
    private router : Router,
    public dialog : MatDialog,
    public dialogRef: MatDialogRef<UpdateCollectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any
    ){}

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
    console.log(this.collection)
    if(this.collection){
      this.collection.name = String(this.updateCollectionForm.value.name);
      this.collection.description = String(this.updateCollectionForm.value.description);

        this.api.updateCollection(this.collection).then(data=>{
        if(this.collection){
        
          if(this.imageUrl === null || this.imageUrl === undefined){
            return
          }
        const imageCollectionId : imageCollectionId = {
          collectionId : this.collection.id,
          url : this.imageUrl
        }
        this.api.postimageToCollection(imageCollectionId)
       
      }
      
    })
    this.dialogRef.close()
  }

    
  }

}
