import { NgModule } from "@angular/core";
import { ShopComponent } from "./shop.component";
import { ShopEditComponent } from "./shop-edit/shop-edit.component";
import { ShopRoutingModule } from "./shop-routing.module";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/Shared.module";
import { ReactiveFormsModule } from "@angular/forms";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatSelectModule } from "@angular/material/select";

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
        MatTooltipModule,
        MatSelectModule
    ]
})
export class ShopModule{

}