import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { exhaustMap, map, take, tap } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { ToastrService } from "ngx-toastr";

@Injectable({ providedIn: 'root' })
export class DataStorageService {
    constructor(private http: HttpClient,
        private recipeService: RecipeService,
        private authService: AuthService,
        private toastr: ToastrService) { }
    storeRecipes() {
        const recipes = this.recipeService.getRecipes();

        if (recipes.length === 0) {
            this.toastr.warning('Minimum One recipe required', 'Data to server Action');
            return false;
        } else {
            this.http.put('https://ng-course-recipe-book-95529-default-rtdb.firebaseio.com/recipes.json', recipes).subscribe(response => {
                console.log(response);
            });
            this.toastr.info('Remote data updated!', 'Data to server Action');
            return true;
        }
    }

    fetchRecipes() {
        // //subscribibg observable in service
        // this.http.get<Recipe[]>('https://ng-course-recipe-book-95529-default-rtdb.firebaseio.com/recipes.json')
        //     .pipe(map(recipes => {
        //         return recipes.map(recipe => {
        //             return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
        //         })
        //     }))
        //     .subscribe(recipes => {
        //         console.log(recipes);
        //         this.recipeService.setRecipes(recipes);
        //     })

        // // returning observable
        // return this.http.get<Recipe[]>('https://ng-course-recipe-book-95529-default-rtdb.firebaseio.com/recipes.json')
        //     .pipe(map(recipes => {
        //         return recipes.map(recipe => {
        //             return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
        //         })
        //     }),
        //         tap(recipes => {
        //             this.recipeService.setRecipes(recipes);
        //         }));


        // // without using Interceptor
        // return this.authService.user.pipe(take(1), exhaustMap(user => {
        //     return this.http.get<Recipe[]>('https://ng-course-recipe-book-95529-default-rtdb.firebaseio.com/recipes.json',
        //         {
        //             params: new HttpParams().set('auth', user.token)
        //         })
        // }),
        //     map(recipes => {
        //         return recipes.map(recipe => {
        //             return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
        //         })
        //     }),
        //     tap(recipes => {
        //         this.recipeService.setRecipes(recipes);
        //     })
        // )


        // using Interceptor
        return this.http.get<Recipe[]>('https://ng-course-recipe-book-95529-default-rtdb.firebaseio.com/recipes.json')
            .pipe(
                map(recipes => {
                    return recipes.map(recipe => {
                        return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
                    })
                }),
                tap(recipes => {
                    this.recipeService.setRecipes(recipes);
                    this.toastr.info('Remote data recieved!', 'Data From server Action');

                })
            );
    }
}