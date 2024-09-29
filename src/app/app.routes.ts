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
import { ModelsComponent } from '../component/Model/models/models.component';
import { SignupComponent } from '../component/User/signup/signup.component';
import { SigninComponent } from '../component/User/signin/signin.component';
import { ProfilComponent } from '../component/User/profil/profil.component';
import { AuthGuard } from '../guards/auth.guard';

export const routes: Routes = [
    {path : "",component:HomeComponent},
    {
        path : "profil",
        component:ProfilComponent,
         canActivate: [AuthGuard],
        data: { importance: 1 }
    },
    {
        path : "signup",
        component:SignupComponent
    },
    {
        path : "signin",
        component:SigninComponent
    },
    {
        path : "collections",
        component:CollectionsComponent,
        canActivate: [AuthGuard],
        data: { importance: 1 }
    },
    {
        path : "add-collection",
        component:AddCollectionComponent,
        canActivate: [AuthGuard],
        data: { importance: 1 }
    },
    {
        path : "update-collection/:collectionId",
        component:UpdateCollectionComponent,
        canActivate: [AuthGuard],
        data: { importance: 1 }
    },
    {
        path : "items/:collectionId",
        component:ItemsComponent,
        canActivate: [AuthGuard],
        data: { importance: 1 }
    },
    {
        path : "add-item/:collectionId",
        component:AddItemComponent,
        canActivate: [AuthGuard],
        data: { importance: 1 }
    },
    {
        path : "update-item/:itemId/:collectionId",
        component:UpdateItemComponent,
        canActivate: [AuthGuard],
        data: { importance: 1 }
    },
    {
        path : "add-category-item/:itemId/:collectionId",
        component:AddCategoryItemComponent,
        canActivate: [AuthGuard],
        data: { importance: 1 }
    },
    {
        path : "update-category/:categoryId/:collectionId",
        component:UpdateCategoryComponent,
        canActivate: [AuthGuard],
        data: { importance: 1 }
    },
    {
        path : "image-upload",
        component:ImageUploadComponent,
        canActivate: [AuthGuard],
        data: { importance: 1 }
    },
    {
        path : "models/:itemId",
        component:ModelsComponent,
        canActivate: [AuthGuard],
        data: { importance: 1 }
    },
    {
        path : "**",
        component:NotFoundComponent
    }
];
