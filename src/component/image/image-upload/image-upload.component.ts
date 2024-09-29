import { Component, Inject, output } from '@angular/core';

import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { throwError } from 'rxjs/internal/observable/throwError';
import { NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-image-upload',
  standalone: true,
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatCardModule,
    NgIf,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './image-upload.component.html',
  styleUrl: './image-upload.component.css'
})
export class ImageUploadComponent {
  status: 'initial' | 'uploading' | 'success' | 'fail' = 'initial';
  file: File | null = null;
  errorMessage: string | null = null; // Pour stocker les messages d'erreur

  constructor(
    private api: ApiService,
    public dialogRef: MatDialogRef<ImageUploadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  @Output() imageEvent = new EventEmitter<any>();

  onChange(event: any) {
    const file: File = event.target.files[0];
    this.errorMessage = null; 

    if (file) {
      
      if (!file.type.startsWith('image/')) {
        this.errorMessage = 'Please upload a valid image file (jpeg, png, etc.).';
        this.file = null;
        return;
      }

      const maxSize = 5 * 1024 * 1024; // 5 Mo
      if (file.size > maxSize) {
        this.errorMessage = 'File size exceeds the limit of 5MB.';
        this.file = null;
        return;
      }

      this.file = file;
      this.status = 'initial';
    }
  }

  onUpload() {
    if (!this.file) {
      this.errorMessage = 'No file selected for upload.';
      return;
    }

    const formData = new FormData();
    formData.append('image', this.file, this.file.name);

    this.status = 'uploading';

    this.api.postImageToServ(formData).then(url => {
      this.status = 'success';
      this.imageEvent.emit(url);
      this.dialogRef.close({ status: 'confirmed', url });
    }).catch(error => {
      console.error(error);
      this.errorMessage = 'An error occurred during the upload. Please try again.';
      this.status = 'fail';
    });
  }
}
