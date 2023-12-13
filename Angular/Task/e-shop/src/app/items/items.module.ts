import { NgModule } from "@angular/core";
import { ItemsComponent } from "./items.component";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/Shared.module";
import { ReactiveFormsModule } from "@angular/forms";
import { ItemsRoutingModule } from "./items-routing.module";
import { ItemsListComponent } from './items-list/items-list.component';
import { ItemsEditComponent } from './items-edit/items-edit.component';
import { ItemsDetailComponent } from './items-detail/items-detail.component';
import { ItemsItemComponent } from './items-list/items-item/items-item.component';
import { CartComponent } from './cart/cart.component';

@NgModule({
    declarations: [
        ItemsComponent,
        ItemsListComponent,
        ItemsEditComponent,
        ItemsDetailComponent,
        ItemsItemComponent,
        CartComponent,
    ],
    imports: [
        RouterModule,
        ItemsRoutingModule,
        SharedModule,
        ReactiveFormsModule
    ]
})
export class ItemsModule{

}