import { Component, Input } from '@angular/core';
import { Collection } from '../../../utils/interface/Collection';
import { ApiService } from '../../../services/api.service';

import { Item } from '../../../utils/interface/Item';
import { Router } from '@angular/router';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [],
  templateUrl: './items.component.html',
  styleUrl: './items.component.css'
})
export class ItemsComponent {
 
  items : Item[] = [];

  constructor(private api : ApiService, private router : Router){}
  
  @Input() set collectionId(collectionId : number){
    this.api.getCollectionItems(collectionId).then(items =>{
      this.items = items
    })

  }
}
