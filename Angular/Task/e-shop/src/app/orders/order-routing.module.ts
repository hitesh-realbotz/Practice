import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { OrdersComponent } from "./orders.component";
import { AuthGuard } from "../auth/auth.guard";
import { OrdersListComponent } from "./orders-list/orders-list.component";
import { OrdersResolverService } from "./orders-resolver.service";
import { OrdersDetailComponent } from "./orders-detail/orders-detail.component";
import { ItemsDetailComponent } from "../items/items-detail/items-detail.component";
import { ItemsResolverService } from "../items/items-resolver.service";

const routes: Routes = [
    {
        path: '', component: OrdersComponent,
        canLoad: [AuthGuard],
        canActivate: [AuthGuard],
        children: [
            { path: '', component: OrdersListComponent, resolve: [OrdersResolverService] },
            { path: 'items/:id/:id2', component: ItemsDetailComponent, resolve: [ItemsResolverService]},
            { path: ':id', component: OrdersDetailComponent, resolve: [OrdersResolverService]},
            { path: ':id/success', component: OrdersDetailComponent, resolve: [OrdersResolverService]},
        ]
    },
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]

})
export class OrderRoutingModule{

}