import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Collection } from '../../../utils/interface/Collection';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-collections',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './collections.component.html',
  styleUrl: './collections.component.css'
})
export class CollectionsComponent {
  constructor(private api : ApiService){}

  collections : Collection[] = [];

  ngOnInit() : void {
    this.getCollectionList()
  }


  private getCollectionList(){
    this.api.getCollections()
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
