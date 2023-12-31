import { NgModule } from "@angular/core";
import { UsersComponent } from "./users.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { RouterModule, Routes } from "@angular/router";
import { AboutUsComponent } from "../shared/about-us/about-us.component";
import { AuthGuard } from "../auth/auth.guard";
import { PaymentComponent } from "../shared/payment/payment.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { OrdersResolverService } from "../orders/orders-resolver.service";
import { CartComponent } from "../items/cart/cart.component";

const routes: Routes = [
    {
        path: '', component: UsersComponent,            // With LazyLoading
        children: [
            { path: '', component: DashboardComponent, resolve: [OrdersResolverService]},
            { path: 'cart', component: CartComponent},
            { path: 'aboutus', component: AboutUsComponent },
            
        ]
    },
    { path: 'profile', component: UserProfileComponent },
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class UsersRoutingModule {

}