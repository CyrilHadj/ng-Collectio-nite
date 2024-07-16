import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { Collection } from '../../../utils/interface/Collection';

@Component({
  selector: 'app-add-collection',
  standalone: true,
  imports: [],
  templateUrl: './add-collection.component.html',
  styleUrl: './add-collection.component.css'
})
export class AddCollectionComponent {

  addCollectionGroup = new FormGroup({
    name : new FormControl<string>(""),
    description : new FormControl<string>("")
  })

  constructor(private api : ApiService){}
  collection : Collection={
    id: 0,
    name: "",
    description: "",
    ImageId: 0
  }

  ngOnInit(){

  }

  onSubmit(){
    if(this.collection){
      if(!this.addCollectionGroup.value.name)return;
      if(!this.addCollectionGroup.value.description)return;

      this.collection.name = this.addCollectionGroup.value.name;
      this.collection.description = this.addCollectionGroup.value.description;

      this.api.postCollection(this.collection)
      .then(data=>{console.log(data)})
    }
  }


}
