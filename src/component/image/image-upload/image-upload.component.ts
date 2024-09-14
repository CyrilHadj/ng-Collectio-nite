import { Component, output } from '@angular/core';

import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { throwError } from 'rxjs/internal/observable/throwError';
import { NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-image-upload',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf,NgSwitch,NgSwitchCase,NgSwitchDefault],
  templateUrl: './image-upload.component.html',
  styleUrl: './image-upload.component.css'
})
export class ImageUploadComponent {
  status: "initial" | "uploading" | "success" | "fail" = "initial";
  file: File | null = null;
  test!: string;

  constructor(private api : ApiService) {}
    @Output() imageEvent = new EventEmitter<any>();

  
  ngOnInit(): void {}

  onChange(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.status = "initial";
      this.file = file;
    }
  }

  onUpload() {
    if (this.file) {
      const formData = new FormData();

      formData.append("image", this.file, this.file.name);

      this.api.postImageToServ(formData).then(url=>{
        this.imageEvent.emit(url)
        this.status = "success";
      })
      .catch(error=>{
        console.log(error)
        this.status = "fail";
      })
      this.status = "uploading";

    
    }
  }

}
