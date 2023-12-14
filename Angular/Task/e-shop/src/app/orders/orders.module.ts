import { NgModule } from "@angular/core";
import { OrdersComponent } from "./orders.component";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/Shared.module";
import { OrderRoutingModule } from "./order-routing.module";
import { OrdersListComponent } from './orders-list/orders-list.component';
import { OrdersDetailComponent } from './orders-detail/orders-detail.component';

@NgModule({
    declarations: [
        OrdersComponent,
        OrdersListComponent,
        OrdersDetailComponent
    ],
    imports : [
        RouterModule,
        SharedModule,
        OrderRoutingModule
    ]
})
export class OrdersModule{

}