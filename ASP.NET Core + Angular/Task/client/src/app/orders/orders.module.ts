import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrdersComponent } from './orders.component';
import { OrdersRoutingModule } from './orders-routing.module';
import { SharedModule } from '../_shared/shared.module';
import { RouterModule } from '@angular/router';
import { OrderBookDetailComponent } from './order-book-detail/order-book-detail.component';



@NgModule({
  declarations: [
    OrderListComponent,
    OrderDetailComponent,
    OrdersComponent,
    OrderBookDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    OrdersRoutingModule
  ]
})
export class OrdersModule { }
