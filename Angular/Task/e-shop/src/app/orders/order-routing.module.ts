import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { OrdersComponent } from "./orders.component";
import { AuthGuard } from "../auth/auth.guard";
import { OrdersListComponent } from "./orders-list/orders-list.component";
import { OrdersResolverService } from "./orders-resolver.service";
import { OrdersDetailComponent } from "./orders-detail/orders-detail.component";

const routes: Routes = [
    {
        path: '', component: OrdersComponent,
        canLoad: [AuthGuard],
        canActivate: [AuthGuard],
        children: [
            { path: '', component: OrdersListComponent, resolve: [OrdersResolverService] },
            { path: ':id', component: OrdersDetailComponent, resolve: [OrdersResolverService]},
        ]
    },
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]

})
export class OrderRoutingModule{

}