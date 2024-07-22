import { Component, Input } from '@angular/core';
import { Collection } from '../../../utils/interface/Collection';
import { ApiService } from '../../../services/api.service';

import { Item } from '../../../utils/interface/Item';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './items.component.html',
  styleUrl: './items.component.css'
})
export class ItemsComponent {
  collection!: Collection;

  items : Item[] = [];

  constructor(private api : ApiService, private router : Router){}
  
  @Input() set collectionId(collectionId : number){
    this.api.getCollection(collectionId)
    .then(collection=>{
      this.collection = collection
    })


    this.api.getCollectionItems(collectionId).then(items =>{
      this.items = items
    })

  }
}
