
import { NgFor } from '@angular/common';
import { Component, Input} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { Url } from '../../../utils/interface/Url';
import { imageToModel } from '../../../utils/interface/ImageToModel';
import { ImageUploadComponent } from '../../image/image-upload/image-upload.component';

@Component({
  selector: 'app-image-slider-model',
  standalone: true,
  imports: [RouterLink,NgFor],
  templateUrl: './image-slider-model.component.html',
  styleUrl: './image-slider-model.component.css'
})
export class ImageSliderModelComponent {

  constructor(private api : ApiService, public dialog : MatDialog){}
  url!: Url;
  modelID!: number;
  
  ngOnInit(){
    console.log(this.modelID)
    this.getImages();
  }

  images: Url[] = [];

  currentIndex = 0;

  deleteImageById(image : Url){
    this.api.deleteImageById(image.id)
    .then(()=>{
      this.api.deleteImageToServ(image.url)
        .then(()=>{
          this.getImages()
            .then(()=>{
                this.currentIndex = 0
            })
        })
    })
  }

  openDialogAddImage() : void {
    const dialogRef = this.dialog.open(ImageUploadComponent,{
      width: "50vw",
    });
    dialogRef.afterClosed().subscribe(result =>{

      if(result){
        this.url = result.url
        const ImageToModel : imageToModel = {
          url: result.url,
          modelId: this.modelID
        }
        this.api.postImageToModel(ImageToModel)
        .then(()=>{
          this.getImages();
        })
      }
    })
  };
   
  @Input() set modelId(modelId : number){
    this.modelID = modelId
  }
  
  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  goToSlide(index: number) {
    this.currentIndex = index;
  }

  async getImages(){
    await this.api.getImageByModel(this.modelID)
    .then(images=>{
      this.images = images
    })
  }
}
