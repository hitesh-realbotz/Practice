import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CartComponent } from '../books/cart/cart.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { cartResolver } from '../_resolver/cart.resolver';
import { ordersResolver } from '../_resolver/orders.resolver';
import { dashboardStatsResolver } from '../_resolver/dashboard-stats.resolver';
import { authGuard } from '../_guards/auth.guard';

const routes: Routes = [
  {
    path: '', component: UsersComponent,            // With LazyLoading
    children: [
      { path: '', component: DashboardComponent, resolve: { userDashStats: dashboardStatsResolver } },
      { path: 'cart', component: CartComponent, resolve: [cartResolver] },
    ]
  },
  { path: 'profile', component: UserProfileComponent },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
