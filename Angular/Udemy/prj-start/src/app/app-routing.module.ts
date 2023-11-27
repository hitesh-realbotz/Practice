import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
// import { RecipesComponent } from "./recipes/recipes.component";
// import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
// import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
// import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
// import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
// import { ResipesResolverService } from "./recipes/recipes-resolver.service";
// import { AuthComponent } from "./auth/auth.component";
// import { AuthGuard } from "./auth/auth.guard";

const appRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full'},

    // // LazyLoading with older versions
    // { path: '/recipes', loadChildren: './recipes/recipes.module@RecipesModule' },

    // LazyLoading with new versions
    { path: 'recipes', loadChildren: ()=> {
        return import('./recipes/recipes.module').then(m => m.RecipesModule);
    } },
    { path: 'shopping-list', loadChildren: ()=> {
        return import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule);
    } },
    { path: 'auth', loadChildren: ()=> {
        return import('./auth/auth.module').then(m => m.AuthModule);
    } },

    // // ====> recipes-routing.module
    // { path: 'recipes', component: RecipesComponent, 
    //     canActivate: [AuthGuard],
    //     children:[
    //     { path: '', component: RecipeStartComponent },
    //     { path: 'new', component: RecipeEditComponent },
    //     { path: ':id', component: RecipeDetailComponent, resolve: [ResipesResolverService]},
    //     { path: ':id/edit', component: RecipeEditComponent, resolve: [ResipesResolverService]},
    // ]},

    // // ====> shopping-list.module
    // { path: 'shopping-list', component: ShoppingListComponent},

    // // ====> auth.module
    // { path: 'auth', component: AuthComponent },
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule]
})
export class AppRoutingModule{

}