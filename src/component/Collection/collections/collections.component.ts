import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Collection } from '../../../utils/interface/Collection';
import { RouterLink } from '@angular/router';
import { Url } from '../../../utils/interface/Url';
import { AsyncPipe, NgFor } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AuthService } from '../../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AddCollectionComponent } from '../add-collection/add-collection.component';
import { UpdateCollectionComponent } from '../update-collection/update-collection.component';

@Component({
  selector: 'app-collections',
  standalone: true,
  imports: [RouterLink,AsyncPipe,NgFor],
  templateUrl: './collections.component.html',
  styleUrl: './collections.component.css'
})
export class CollectionsComponent {
  constructor(
    private api : ApiService,
    private sanitizer : DomSanitizer,
    private auth : AuthService,
    public dialog : MatDialog 
    ){}

  collections : Collection[] = [];

  imageUrls: { [key: number]: SafeUrl } = {};  

 ngOnInit() : void {
    this.getCollectionList()
    .then(()=>{ 
      this.collections.forEach(async collection=>{
      const imageUrl = await this.getCollectionImage(collection.id)
      this.imageUrls[collection.id] = imageUrl
    })
  })
   
  }
  openAddCollectionDialog() {
    const dialogRef = this.dialog.open(AddCollectionComponent,{
      width: "50vw",
      data : {}
    })
    dialogRef.afterClosed().subscribe(result =>{
      this.getCollectionList()
      .then(()=>{ 
        this.collections.forEach(async collection=>{
        const imageUrl = await this.getCollectionImage(collection.id)
        this.imageUrls[collection.id] = imageUrl
      })
    })
    })
  }

  openUpdateCollectionDialog(collectionId : number) {
    const dialogRef = this.dialog.open(UpdateCollectionComponent,{
      width: "50vw",
      data : {id : collectionId}
    })
    dialogRef.afterClosed().subscribe(result =>{
      this.getCollectionList()
      .then(()=>{ 
        this.collections.forEach(async collection=>{
        const imageUrl = await this.getCollectionImage(collection.id)
        this.imageUrls[collection.id] = imageUrl
      })
    })
    })
  }




  public async getCollectionImage(collectionId : number){
    const image = await this.api.getImageByCollection(collectionId);
    const SafeUrl = this.sanitizer.bypassSecurityTrustUrl(image.url);
    return SafeUrl
  }

  private async getCollectionList(){
    const collections = await this.auth.getUserCollection()
    
    if(collections !== null){
      this.collections = collections
    }else{
      return
    }
  }


  public deleteCollection(collectionId : number) : void{
   this.api.deleteCollection(collectionId)
   .then(data=>{
    console.log(data)
    this.getCollectionList()
    })
  }

}
