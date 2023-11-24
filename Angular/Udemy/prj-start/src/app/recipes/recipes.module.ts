import { NgModule } from "@angular/core";
import { RecipesComponent } from "./recipes.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RouterModule } from "@angular/router";
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { DropdownDirective } from "../shared/dropdown.directive";
import { RecipesRoutingModule } from "./recipes-routing.module";
import { SharedModule } from "../shared/Shared.module";

@NgModule({
    declarations: [
        RecipesComponent,
        RecipeListComponent,
        RecipeDetailComponent,
        RecipeItemComponent,
        RecipeStartComponent,
        RecipeEditComponent,
    ],
    imports: [
        RouterModule,
        // CommonModule,
        SharedModule,
        ReactiveFormsModule,
        RecipesRoutingModule
        
    ],

    // // ====> No need to export as recipes-routing.module included
    // exports: [
    //     RecipesComponent,
    //     RecipeListComponent,
    //     RecipeDetailComponent,
    //     RecipeItemComponent,
    //     RecipeStartComponent,
    //     RecipeEditComponent,
    //     DropdownDirective, 
    // ]
})
export class RecipesModule {

}