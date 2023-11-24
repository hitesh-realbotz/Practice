import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ShoppingListComponent } from "./shopping-list.component";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../shared/Shared.module";

const routes: Routes = [

]

@NgModule({

    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent,
    ],

    imports: [
        // CommonModule, // replaced with SharedModule
        SharedModule,
        FormsModule,
        RouterModule.forChild([
            { path: 'shopping-list', component: ShoppingListComponent},
        ]),
    ]

})
export class ShoppingListModule {

}