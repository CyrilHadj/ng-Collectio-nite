import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Collection } from '../../../utils/interface/Collection';
@Component({
  selector: 'app-collections',
  standalone: true,
  imports: [],
  templateUrl: './collections.component.html',
  styleUrl: './collections.component.css'
})
export class CollectionsComponent {
  constructor(private api : ApiService){}

  collections : Collection[] = [];

  ngOnInit() : void {
    this.api.getCollections()
    .then(collections=>{
      this.collections = collections
    })
  }
}
