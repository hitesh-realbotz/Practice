import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ShopComponent } from "./shop.component";
import { AuthGuard } from "../auth/auth.guard";
import { ShopEditComponent } from "./shop-edit/shop-edit.component";
import { ItemsComponent } from "../items/items.component";
import { ItemsListComponent } from "../items/items-list/items-list.component";
import { ItemsDetailComponent } from "../items/items-detail/items-detail.component";
import { ItemsEditComponent } from "../items/items-edit/items-edit.component";
import { ItemsResolverService } from "../items/items-resolver.service";
import { OrdersListComponent } from "../orders/orders-list/orders-list.component";
import { OrdersResolverService } from "../orders/orders-resolver.service";
import { OrdersDetailComponent } from "../orders/orders-detail/orders-detail.component";

const routes: Routes = [
    {
        path: '', component: ShopComponent,
        // path: '', component: ItemsListComponent,
        canLoad: [AuthGuard],
        canActivate: [AuthGuard],
        children: [
            { path: '', component: ItemsListComponent, resolve: [ItemsResolverService] },
            { path: 'details', component: ShopEditComponent },  //Registration & Updation of shop details
            { path: 'new', component: ItemsEditComponent, resolve: [ItemsResolverService] },     //New Item Registration
            { path: 'orders', component: OrdersListComponent, resolve: [OrdersResolverService]},     
            { path: 'orders/:id', component: OrdersDetailComponent, resolve: [OrdersResolverService]},      
            { path: ':id', component: ItemsDetailComponent, resolve: [ItemsResolverService]},    //Item Details
            { path: ':id/edit', component: ItemsEditComponent, resolve: [ItemsResolverService]}, //Item Edit
        ]
    },

]
@NgModule({ 
    imports : [RouterModule.forChild(routes)],
    exports : [RouterModule]
})
export class ShopRoutingModule{

}