import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  {
      path: '', component: UsersComponent,            // With LazyLoading
      children: [
          { path: '', component: UsersComponent},
          // { path: '', component: DashboardComponent, resolve: [OrdersResolverService]},
          // { path: 'cart', component: CartComponent},
          // { path: 'aboutus', component: AboutUsComponent },
          
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
