import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { Caracteristique } from '../../../utils/interface/Caracteristique';
import { CaracteristiqueToModel } from '../../../utils/interface/CaracteristiqueToModel';
import { Content } from '../../../utils/interface/Content';
import { Model } from '../../../utils/interface/Model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddContentComponent } from '../add-content/add-content.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-update-component',
  standalone: true,
  imports: [ReactiveFormsModule,NgFor],
  templateUrl: './update-component.component.html',
  styleUrl: './update-component.component.css'
})
export class UpdateComponentComponent {
  
  constructor(
    private api: ApiService, 
    public dialogRef: MatDialogRef<UpdateComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {}

  currentPage: number = 0;
  pageSize: number = 2;

  caracteristique: Caracteristique[] = [{
    title: '',
    subtitle: '',
    id: 0
  }];
  
  contents: Content[] = [];
  model!: Model;


  caracteristiqueForm = new FormGroup({
    title: new FormControl("", [Validators.required, Validators.minLength(1)]),
    subtitle: new FormControl("", [Validators.required])
  });


  contentForms: FormGroup[] = [];

  ngOnInit() {
    this.loadData();
  }


  async loadData() {
    await this.getContent(this.data.modelId);
    await this.getCaracteristique(this.data.modelId);
  }

  saveChanges(): void {
    if (this.caracteristiqueForm) {
      this.caracteristique[0].title = this.caracteristiqueForm.value.title ?? "";
      this.caracteristique[0].subtitle = this.caracteristiqueForm.value.subtitle ?? "";
      console.log("Form Values: ", this.caracteristiqueForm.value);
      this.updateCaracteristique(this.caracteristique[0]);
    }

    this.contentForms.forEach((form, index) => {
      if (form) {
        this.contents[index].title = form.get('title')?.value!;
        this.contents[index].text = form.get('text')?.value!;
        this.updateContent(this.contents[index]);
      }
    });

    this.dialogRef.close();
  }

  get paginatedContentForms(): FormGroup[] {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.contentForms.slice(startIndex, endIndex);
  }


  totalPages(): number {
    return Math.ceil(this.contentForms.length / this.pageSize);
  }


  nextPage(): void {
    if (this.currentPage < this.totalPages() - 1) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }


  public async getCaracteristique(modelId: number) {
    await this.api.getCaracteristiqueByModel(modelId)
      .then(caracteristique => {
        this.caracteristique = caracteristique;

        if (this.caracteristique) {
          this.caracteristiqueForm.patchValue({
            title: this.caracteristique[0].title,
            subtitle: this.caracteristique[0].subtitle
          });
        }
      });
  }


  public async updateCaracteristique(caracteristique: Caracteristique) {
    await this.api.updateCaracteristique(caracteristique);
  }


  public async getContent(modelId: number) {
    await this.api.getContentByModel(modelId)
      .then(contents => {
        this.contents = contents;
        this.contentForms = this.contents.map(content =>
          new FormGroup({
            title: new FormControl(content.title, [Validators.required]),
            text: new FormControl(content.text, [Validators.required])
          })
        );
      });
  }


  public async updateContent(content: Content) {
    await this.api.updateContent(content);
  }

}
