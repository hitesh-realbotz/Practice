import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrdersComponent } from './orders.component';



@NgModule({
  declarations: [
    OrderListComponent,
    OrderDetailComponent,
    OrdersComponent
  ],
  imports: [
    CommonModule
  ]
})
export class OrdersModule { }
