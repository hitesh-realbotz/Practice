import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ItemsComponent } from "./items.component";
import { ItemsListComponent } from "./items-list/items-list.component";
import { ItemsEditComponent } from "./items-edit/items-edit.component";
import { AuthGuard } from "../auth/auth.guard";
import { ItemsResolverService } from "./items-resolver.service";
import { ItemsDetailComponent } from "./items-detail/items-detail.component";
import { PaymentComponent } from "../shared/payment/payment.component";
const routes: Routes = [
    { path: 'payment', component: PaymentComponent, resolve: [ItemsResolverService]},
    {
        path: '', component: ItemsComponent,
        canLoad: [AuthGuard],
        canActivate: [AuthGuard],
        children: [
            { path: '', component: ItemsListComponent, resolve: [ItemsResolverService]  },
            { path: 'new', component: ItemsEditComponent, resolve: [ItemsResolverService] },
            { path: ':id', component: ItemsDetailComponent, resolve: [ItemsResolverService]},
            { path: ':id/edit', component: ItemsEditComponent, resolve: [ItemsResolverService]},
        ]
    },
    
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ItemsRoutingModule {

}