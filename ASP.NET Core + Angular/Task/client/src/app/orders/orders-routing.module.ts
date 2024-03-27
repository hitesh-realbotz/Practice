import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './orders.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { authGuard } from '../_guards/auth.guard';
import { orderDetailResolver } from '../_resolver/order-detail.resolver';
import { OrderBookDetailComponent } from './order-book-detail/order-book-detail.component';
import { orderItemDetailResolver } from '../_resolver/order-item-detail.resolver';
import { ordersResolver } from '../_resolver/orders.resolver';

const routes: Routes = [
  {
      path: '', component: OrdersComponent,
      canActivate: [authGuard],
      children: [
          { path: '', component: OrderListComponent, resolve: [ordersResolver] },
          // { path: 'items/:id/:id2', component: ItemsDetailComponent, resolve: [ItemsResolverService]},
          { path: ':id/success', component: OrderDetailComponent, resolve: {order:orderDetailResolver}},
          { path: ':id/:id2', component: OrderBookDetailComponent, resolve: {orderItem:orderItemDetailResolver}},
          { path: ':id', component: OrderDetailComponent, resolve: {order:orderDetailResolver}},
      ]
  },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class OrdersRoutingModule { }
