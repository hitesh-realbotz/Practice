import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ShoppingListComponent } from "./shopping-list.component";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
// import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../shared/Shared.module";
import { LoggingService } from "../logging.service";

@NgModule({

    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent,
    ],

    imports: [
        // CommonModule,  // replaced with SharedModule
        SharedModule,
        FormsModule,
        RouterModule.forChild([
            // { path: 'shopping-list', component: ShoppingListComponent},  // Without LazyLoading
            { path: '', component: ShoppingListComponent},                  // With LazyLoading
        ]),
    ],
    //Loading Service by Lazy loaded module : creates separate instance
    providers: [LoggingService] 
})
export class ShoppingListModule {

}