import { Component, Input } from '@angular/core';
import {MatChipsModule} from '@angular/material/chips';
import {MatTabsModule} from '@angular/material/tabs';
import { Task } from '../../../utils/interface/Task';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators, } from '@angular/forms';
import { NgFor } from '@angular/common';
import { ApiService } from '../../../services/api.service';
import { Model } from '../../../utils/interface/Model';

@Component({
  selector: 'app-check-list-model',
  standalone: true,
  imports: [MatChipsModule,MatTabsModule,FormsModule,NgFor,ReactiveFormsModule],
  templateUrl: './check-list-model.component.html',
  styleUrl: './check-list-model.component.css'
})
export class CheckListModelComponent {

  model!: Model; 
  constructor(private api : ApiService){}

  tasks: Task[] = [];

  ngOnInit() : void{
  
  }

  selectedFilter: string = 'all';
  filteredTasks: Task[] = this.tasks;

  filterTasks(filter: string): void {
    this.selectedFilter = filter;
    if (filter === 'completed') {
      this.filteredTasks = this.tasks.filter(task => task.completed);
    } else if (filter === 'inProgress') {
      this.filteredTasks = this.tasks.filter(task => !task.completed);
    } else {
      this.filteredTasks = this.tasks;
    }
  }
// Formulaire ajout d'une tache 
addTaskGroup = new FormGroup({
  title : new FormControl<string>("",[
    Validators.required,
    Validators.minLength(1)
  ])
});

public newTaskSubmit(){
  const task : any ={
    modelId: this.model.id,
    title: '',
    completed: false
  }
  if(this.addTaskGroup.value.title){
    task.title = this.addTaskGroup.value.title
    this.addTask(task)
    .then(()=>{
      this.getTask(this.model.id)
    })
  }
}

@Input() set modelId(modelId : number){
  this.api.getModelById(modelId)
  .then(model=>{
    this.model = model
    this.getTask(this.model.id)
  })
}
// Method

public addTask(task : any){
  return this.api.postTaskToModel(task)
}

public deleteTask(id : number){
  this.api.deleteTaskById(id).then(()=>{
    this.getTask(this.model.id)
  })
}

public updateTask(task : Task){
  this.api.updateTask(task)
}

public getTask(modelId : number){
  this.api.getTaskByModel(modelId)
  .then(tasks=>{
    this.tasks = tasks
    this.filterTasks(this.selectedFilter);
  })
}

}
