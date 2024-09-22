import { Component, Input } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';
import { CheckListModelComponent } from '../check-list-model/check-list-model.component';
import { Model } from '../../../utils/interface/Model';
import { ContentModelComponent } from '../content-model/content-model.component';
import { ImageSliderModelComponent } from '../image-slider-model/image-slider-model.component';
@Component({
  selector: 'app-models',
  standalone: true,
  imports: [CheckListModelComponent,ContentModelComponent,ImageSliderModelComponent],
  templateUrl: './models.component.html',
  styleUrl: './models.component.css'
})
export class ModelsComponent {
  models : Model[] = []

  constructor(
    private api : ApiService,
     private router : Router,
    ){}
  itemID : number = 0
  ngOnInit() : void{
   

  }


  @Input() set itemId(itemId : number){
    this.itemID = itemId
    this.api.getModelsByItemId(itemId)
    .then(models=>{
      this.models = models
    })
  }


}
