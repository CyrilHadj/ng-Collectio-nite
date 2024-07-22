import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';

import { Item } from '../../../utils/interface/Item';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-item',
  standalone: true,
  imports: [],
  templateUrl: './update-item.component.html',
  styleUrl: './update-item.component.css'
})
export class UpdateItemComponent {

  item!: Item; 
  
  updateItemForm = new FormGroup({
    name : new FormControl<string>("",[
      Validators.required,
      Validators.minLength(1)
    ]),
  })

  constructor(private api : ApiService, private router : Router){}

  onSubmit(){
    if(this.item){
      
    }
  }
}
