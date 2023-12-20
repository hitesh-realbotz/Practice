import { NgModule } from "@angular/core";
import { ShopComponent } from "./shop.component";
import { ShopEditComponent } from "./shop-edit/shop-edit.component";
import { ShopRoutingModule } from "./shop-routing.module";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/Shared.module";
import { ReactiveFormsModule } from "@angular/forms";
import { ItemsComponent } from "../items/items.component";
import { MatTooltipModule } from "@angular/material/tooltip";

@NgModule({
    declarations : [
        ShopComponent,
        ShopEditComponent,
    ],
    imports : [
        RouterModule,
        ShopRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        MatTooltipModule
    ]
})
export class ShopModule{

}