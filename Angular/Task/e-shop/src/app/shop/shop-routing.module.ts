import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ShopComponent } from "./shop.component";
import { AuthGuard } from "../auth/auth.guard";
import { ShopEditComponent } from "./shop-edit/shop-edit.component";
import { ItemsComponent } from "../items/items.component";
import { ItemsListComponent } from "../items/items-list/items-list.component";
import { ItemsDetailComponent } from "../items/items-detail/items-detail.component";
import { ItemsEditComponent } from "../items/items-edit/items-edit.component";

const routes: Routes = [
    {
        path: '', component: ShopComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: ItemsListComponent },
            { path: 'details', component: ShopEditComponent },  //Registration & Updation of shop details
            { path: 'new', component: ItemsEditComponent },     //New Item Registration
            { path: ':id', component: ItemsDetailComponent},    //Item Details
            { path: ':id/edit', component: ItemsEditComponent}, //Item Edit      
        ]
    },

]
@NgModule({ 
    imports : [RouterModule.forChild(routes)],
    exports : [RouterModule]
})
export class ShopRoutingModule{

}