import { Routes } from '@angular/router';
import { NotFoundComponent } from '../component/not-found/not-found.component';
import { HomeComponent } from '../component/home/home.component';
import { CollectionsComponent } from '../component/Collection/collections/collections.component';

export const routes: Routes = [
    {path : "",component:HomeComponent},
    {path : "collections",component:CollectionsComponent},
    {path : "**",component:NotFoundComponent}
];
