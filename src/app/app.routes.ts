import { Routes } from '@angular/router';
import { NotFoundComponent } from '../component/not-found/not-found.component';
import { HomeComponent } from '../component/home/home.component';
import { CollectionsComponent } from '../component/Collection/collections/collections.component';
import { AddCollectionComponent } from '../component/Collection/add-collection/add-collection.component';
import { UpdateCollectionComponent } from '../component/Collection/update-collection/update-collection.component';
import { ItemsComponent } from '../component/Item/items/items.component';
import { AddItemComponent } from '../component/Item/add-item/add-item.component';
import { UpdateItemComponent } from '../component/Item/update-item/update-item.component';
import { AddCategoryComponent } from '../component/category/add-category/add-category.component';
import { UpdateCategoryComponent } from '../component/category/update-category/update-category.component';
import { AddCategoryItemComponent } from '../component/category/add-category-item/add-category-item.component';
import { ImageUploadComponent } from '../component/image/image-upload/image-upload.component';
import { ImageSliderModelComponent } from '../component/Model/image-slider-model/image-slider-model.component';
import { ContentModelComponent } from '../component/Model/content-model/content-model.component';
import { CheckListModelComponent } from '../component/Model/check-list-model/check-list-model.component';
import { ModelsComponent } from '../component/Model/models/models.component';

export const routes: Routes = [
    {path : "",component:HomeComponent},
    {path : "collections",component:CollectionsComponent},
    {path : "add-collection",component:AddCollectionComponent},
    {path : "update-collection/:collectionId",component:UpdateCollectionComponent},
    {path : "items/:collectionId",component:ItemsComponent},
    {path : "add-item/:collectionId",component:AddItemComponent},
    {path : "update-item/:itemId/:collectionId",component:UpdateItemComponent},
    {path : "add-category/:collectionId",component:AddCategoryComponent},
    {path : "add-category-item/:itemId/:collectionId",component:AddCategoryItemComponent},
    {path : "update-category/:categoryId/:collectionId",component:UpdateCategoryComponent},
    {path : "image-upload",component:ImageUploadComponent},
    {path : "models/:itemId",component:ModelsComponent},
    {path : "**",component:NotFoundComponent}
];
