import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { UpdateCollectionComponent } from '../../Collection/update-collection/update-collection.component';
import { Url } from '../../../utils/interface/Url';
import { ImageUploadComponent } from '../../image/image-upload/image-upload.component';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})
export class UpdateUserComponent {

  imageUrl!: Url | void;
  
  constructor(
    private api : ApiService,
    private router : Router,
    public dialog : MatDialog,
    public dialogRef: MatDialogRef<UpdateCollectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any
    ){}
    
    updateUserForm = new FormGroup({
      name : new FormControl<string>(""),
      description : new FormControl<string>("")
    })
  

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


}
