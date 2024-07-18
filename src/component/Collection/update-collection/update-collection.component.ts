import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { Collection } from '../../../utils/interface/Collection';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-collection',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-collection.component.html',
  styleUrl: './update-collection.component.css'
})
export class UpdateCollectionComponent {

  collection : Collection | null = null;

  updateCollectionForm = new FormGroup({
    name : new FormControl<string>(""),
    description : new FormControl<string>("")
  })

  constructor(private api : ApiService, private router : Router){}

  onSubmit(){
    if(this.collection){
      this.collection.name = String(this.updateCollectionForm.value.name);
      this.collection.description = String(this.updateCollectionForm.value.description);
      console.log(this.collection)
      this.api.updateCollection(this.collection).then(data=>{
        this.router.navigateByUrl("/collections")
      })
    }

    
  }

  @Input() set collectionId(collectionId : number){
    this.api.getCollection(collectionId).then(collection =>{
      this.collection = collection
    })
    .catch(error => console.log(error))
  }

}
