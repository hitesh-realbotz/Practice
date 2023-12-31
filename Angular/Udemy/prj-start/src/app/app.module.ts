import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

// import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { RecipesComponent } from './recipes/recipes.component';
// import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
// import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
// import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
// import { ShoppingListComponent } from './shopping-list/shopping-list.component';
// import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { DropdownDirective } from './shared/dropdown.directive';
// import { ShoppingListService } from './shopping-list/shopping-list.service';
// import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
// import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
// import { RecipeService } from './recipes/recipe.service';
// import { AuthComponent } from './auth/auth.component';
// import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
// import { AuthInterceptorService } from './auth/auth-interceptor.service';
// import { AlertComponent } from './shared/alert/alert.component';
// import { PlaceholderDirective } from './shared/placeholder/placeholder.directive';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/Shared.module';
import { CoreModule } from './core.module';
import { LoggingService } from './logging.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

// // LazyLoading
// import { RecipesModule } from './recipes/recipes.module';
// import { ShoppingListModule } from './shopping-list/shopping-list.module';
// import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,

    // // ====> recipes.module
    // RecipesComponent,
    // RecipeListComponent,
    // RecipeDetailComponent,
    // RecipeItemComponent,

    // // ====> shopping-list.module
    // ShoppingListComponent,
    // ShoppingEditComponent,

    // // ====> recipes.module
    // DropdownDirective,
    // RecipeStartComponent,
    // RecipeEditComponent,

    // // ====> auth.module
    // AuthComponent,

    // // ====> shared.module
    // LoadingSpinnerComponent,
    // AlertComponent,
    // PlaceholderDirective,

  ],
  imports: [
    BrowserModule,
    // FormsModule,         //====> auth.module   
    // ReactiveFormsModule, // ====> recipes.module

    // // LazyLoading
    // RecipesModule,       
    // ShoppingListModule,
    // AuthModule,

    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    CoreModule,
    BrowserAnimationsModule,
        ToastrModule.forRoot(
            {
                positionClass: 'toast-bottom-right',
                closeButton: true,
                progressBar: true
            }
        )
  ],

  // // ====> core.module
  // providers: [
  //   ShoppingListService, RecipeService,
  //   {
  //     provide: HTTP_INTERCEPTORS,
  //     useClass: AuthInterceptorService,
  //     multi: true
  //   }
  // ],

  providers: [LoggingService], //Loading Service in appmodule
  bootstrap: [AppComponent]
})
export class AppModule { }
