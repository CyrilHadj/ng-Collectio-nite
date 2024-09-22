import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Collection } from '../../../utils/interface/Collection';
import { RouterLink } from '@angular/router';
import { Url } from '../../../utils/interface/Url';
import { AsyncPipe } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-collections',
  standalone: true,
  imports: [RouterLink,AsyncPipe],
  templateUrl: './collections.component.html',
  styleUrl: './collections.component.css'
})
export class CollectionsComponent {
  constructor(private api : ApiService,private sanitizer : DomSanitizer ){}

  collections : Collection[] = [];

  // Stocker les URLs d'images avec l'ID de la collection comme clé
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

  public async getCollectionImage(collectionId : number){
    const image = await this.api.getImageByCollection(collectionId);
    const SafeUrl = this.sanitizer.bypassSecurityTrustUrl(image.url);
    return SafeUrl
  }

  private async getCollectionList(){
    await this.api.getCollections()
    .then(collections=>{
      this.collections = collections
    })
  }


  public deleteCollection(collectionId : number) : void{
   this.api.deleteCollection(collectionId)
   .then(data=>{
    console.log(data)
    this.getCollectionList()
    })
  }

}
