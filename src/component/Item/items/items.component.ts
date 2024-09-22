import {Component, Input } from '@angular/core';
import { Collection } from '../../../utils/interface/Collection';
import { ApiService } from '../../../services/api.service';
import {MatButtonModule} from '@angular/material/button';
import { Item } from '../../../utils/interface/Item';
import { Router, RouterModule } from '@angular/router';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { AddItemComponent } from '../add-item/add-item.component';
import { UpdateItemComponent } from '../update-item/update-item.component';
import { UpdateCollectionComponent } from "../../Collection/update-collection/update-collection.component";
import { Category } from '../../../utils/interface/Category';
import { CategoryAndItemId } from '../../../utils/interface/CategoryAndItemId';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ImageUploadComponent } from '../../image/image-upload/image-upload.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [
    
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    AddItemComponent,
    UpdateItemComponent,
    UpdateCollectionComponent
],

  templateUrl: './items.component.html',
  styleUrl: './items.component.css'
})
export class ItemsComponent {

  constructor(
    private api : ApiService,
     private router : Router,
     private sanitizer : DomSanitizer,
     public dialog : MatDialog
    ){}

  categories : Category[] = [];
  items : Item[] = [];
  collection!: Collection;

   // Stocker les URLs d'images avec l'ID de la collection comme clé
   imageUrls: { [key: number]: SafeUrl } = {};  

   
   ngOnInit() : void{
     this.getCategories()
   
    }
    
    openAddItemFormDialog() {
      const dialogRef = this.dialog.open(AddItemComponent,{
        width: "50vw",
        data : {collectionId : this.collection.id}
      })
      dialogRef.afterClosed().subscribe(result =>{
        this.loadItemsAndImages(this.collection.id);
      })
    }
  
    public async getItemImage(itemId : number){
      try{
      const image = await this.api.getImageByItem(itemId)
      console.log(image[0].url)
      const SafeUrl = this.sanitizer.bypassSecurityTrustUrl(image[0].url);
      console.log(SafeUrl)
      return SafeUrl;
    }catch(error){
      console.log("an error has occured" + error)
      return '';
    }
    }

    public submit(collectionId : number){
      this.getItems(collectionId);
      this.loadItemsAndImages(collectionId);
    }

    public getItemByCollection(collectionId : number){
      this.api.getCollection(collectionId)
      .then(collection=>{
        this.collection = collection
      })
    }

    public async loadItemsAndImages(collectionId : number) : Promise<void>{
      try {
        this.collection = await this.api.getCollection(collectionId);

        this.items = await this.api.getCollectionItems(collectionId);

        for (const item of this.items){
          const imageUrl = await this.getItemImage(item.id)
          this.imageUrls[item.id] = imageUrl
        }


      }
      catch(error){
        console.log(error)
      }
    }

    @Input() set collectionId(collectionId : number){
      this.loadItemsAndImages(collectionId);
    }
  
  //Méthodes
  public getItems(id : number) : Promise<any>{
    return this.api.getCollectionItems(id).then(items =>{
        this.items = items
      })
    }
    
    public getCategories(){
      this.api.getCategories().then(categories =>{
        this.categories = categories
      })
    }
    
    public showItemByCategory(CategoryId : number){
      this.api.getItemByCategory(CategoryId).then(items =>{
        this.items = items
      })
    }
    
    public deleteCategory(categoryId : number){
      this.api.deleteCategory(categoryId)
      .then(data=>{
        this.getCategories()
      })
    };
    
    public deleteItem(itemId : number) : void{
      this.api.deleteItem(itemId)
      .then(data=>{
        this.getItems(this.collection.id)
      })
    };
    
}
