import { Component, Input } from '@angular/core';
import { Model } from '../../../utils/interface/Model';
import { ApiService } from '../../../services/api.service';
import { Caracteristique } from '../../../utils/interface/Caracteristique';
import { CaracteristiqueToModel } from '../../../utils/interface/CaracteristiqueToModel';
import { Content } from '../../../utils/interface/Content';
import { ContentToModel } from '../../../utils/interface/ContentToModel';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AddContentComponent } from '../add-content/add-content.component';
import { UpdateComponentComponent } from '../update-component/update-component.component';

@Component({
  selector: 'app-content-model',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf,NgFor,JsonPipe
  
  ],
  templateUrl: './content-model.component.html',
  styleUrl: './content-model.component.css'
})
export class ContentModelComponent {

  model!: Model; 

 constructor(private api : ApiService, public dialog : MatDialog){}

  caracteristique : Caracteristique = {
    title: '',
    subtitle: '',
    id: 0
  }
  
  ngOnInit(){

  }

  contents : Content [] = []



  @Input() set modelId(modelId : number){
    this.api.getModelById(modelId)
    .then(model=>{
      this.model = model
      this.getContent(this.model.id);
      this.getCaracteristique(this.model.id);
    })
   

  }

//method
//form

openDialogAddForm() : void {
  this.dialog.open(AddContentComponent,{
    width: "50vw",
    data : {modelId : this.model.id}
  });
 
  this.getContent(this.model.id);

 
};

openDialogUpdateForm() : void {
  this.dialog.open(UpdateComponentComponent,{
    width: "50vw",
    data : {modelId : this.model.id}
  });
  this.getContent(this.model.id);
 

 
};


//caracteristique

public deleteCaracteristique(caracteristiqueId : number){
  this.api.deleteCaracteristiqueById(caracteristiqueId)
  .then(()=>{
    this.getCaracteristique(this.model.id)
  })
}



public getCaracteristique(modelId : number){
  this.api.getCaracteristiqueByModel(modelId)
  .then(caracteristique=>{
    console.log('Caracteristique:', caracteristique);
    if (caracteristique) {
      this.caracteristique = caracteristique[0];
      console.log('Updated caracteristique:', this.caracteristique);
    }
  })
  .catch(error => {
    console.error('Error fetching caracteristique:', error);
  });
}
//Content

public deleteContent(contentId : number){
  this.api.deleteContentById(contentId)
  .then(()=>{
    this.getContent(this.model.id)
  })
}



public getContent(modelId : number){
  this.api.getContentByModel(modelId)
  .then(contents=>{
    this.contents = contents
  })
}



}
