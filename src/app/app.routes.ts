import { Routes } from '@angular/router';
import { NotFoundComponent } from '../component/not-found/not-found.component';
import { HomeComponent } from '../component/home/home.component';
import { CollectionsComponent } from '../component/Collection/collections/collections.component';
import { AddCollectionComponent } from '../component/Collection/add-collection/add-collection.component';
import { UpdateCollectionComponent } from '../component/Collection/update-collection/update-collection.component';
import { ItemsComponent } from '../component/Item/items/items.component';

export const routes: Routes = [
    {path : "",component:HomeComponent},
    {path : "collections",component:CollectionsComponent},
    {path : "add-collection",component:AddCollectionComponent},
    {path : "update-collection/:collectionId",component:UpdateCollectionComponent},
    {path : "items/:collectionId",component:ItemsComponent},
    {path : "**",component:NotFoundComponent}
];
