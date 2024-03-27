import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { OrdersComponent } from './orders.component';
import { OrderListComponent } from './order-list/order-list.component';
import { ordersResolver } from './orders.resolver';
import { OrderDetailComponent } from './order-detail/order-detail.component';

const routes: Routes = [
  {
      path: '', component: OrdersComponent,
      
      children: [
          { path: '', component: OrderListComponent, resolve: [ordersResolver] },
          // { path: 'items/:id/:id2', component: ItemsDetailComponent, resolve: [ItemsResolverService]},
          { path: ':id', component: OrderDetailComponent, resolve: [ordersResolver]},
          { path: ':id/success', component: OrderDetailComponent, resolve: [ordersResolver]},
      ]
  },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class OrdersRoutingModule { }
