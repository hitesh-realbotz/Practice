import { NgModule } from "@angular/core";
import { OrdersComponent } from "./orders.component";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/Shared.module";
import { OrderRoutingModule } from "./order-routing.module";
import { CustomPaginatorLabels, OrdersListComponent } from './orders-list/orders-list.component';
import { OrdersDetailComponent } from './orders-detail/orders-detail.component';
import { MatListModule } from "@angular/material/list";
import { MatPaginatorIntl, MatPaginatorModule } from "@angular/material/paginator";
import { MatFormFieldModule } from "@angular/material/form-field";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        OrdersComponent,
        OrdersListComponent,
        OrdersDetailComponent
    ],
    imports : [
        RouterModule,
        SharedModule,
        OrderRoutingModule,
        MatListModule,
        MatPaginatorModule,
        MatFormFieldModule,
        ReactiveFormsModule
    ],
    providers: [
        { provide: MatPaginatorIntl, useClass: CustomPaginatorLabels }
    ]
})
export class OrdersModule{

}