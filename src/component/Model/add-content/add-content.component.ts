import { ChangeDetectionStrategy, Component, Inject, model } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ContentToModel } from '../../../utils/interface/ContentToModel';
import { ApiService } from '../../../services/api.service';
import { Content } from '../../../utils/interface/Content';

@Component({
  selector: 'app-add-content',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
  
    ],
  templateUrl: './add-content.component.html',
  styleUrl: './add-content.component.css',

})
export class AddContentComponent {
  content : ContentToModel={
    title: "",
    text: "",
    modelId: 0
  }

  constructor(
    private api : ApiService,
    public dialogRef: MatDialogRef<AddContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any
  ){}

  public addContent(content : ContentToModel){
    return this.api.postContentToModel(content)
  }
  
  addNewContent() : void {
    if(!this.addContentForm.value.title)return;
    if(!this.addContentForm.value.text)return;

    this.content.title = this.addContentForm.value.title;
    this.content.text = this.addContentForm.value.text;
    this.content.modelId = this.data.modelId;

    this.addContent(this.content);
    this.dialogRef.close();
  }

  addContentForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(1)]),
    text: new FormControl('', [Validators.required, Validators.minLength(1)])
  });
}
