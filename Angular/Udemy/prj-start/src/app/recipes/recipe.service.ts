import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [];
  // private recipes: Recipe[] = [
  //     new Recipe(
  //       'Tasty Palak', 
  //       'This is simple test',
  //       'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1170&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //       [
  //         new Ingredient('Onion',4),
  //         new Ingredient('Garlic',2)
  //       ]),
  //     new Recipe(
  //       'Tasty Paneer', 
  //       'This is simple another test',
  //       'https://media.istockphoto.com/id/1005390252/photo/chicken-tikka-masala-spicy-curry-meat-food-with-rice-and-naan-bread.webp?b=1&s=170667a&w=0&k=20&c=25sPUvlgjdQgzEIqKTbzKnjd7_wrtthcg2pvwYKmMD4=',
  //       [
  //         new Ingredient('Onion',4),
  //         new Ingredient('Ginger',1)
  //       ]),
  //   ];
  constructor(private slService: ShoppingListService, private toastr: ToastrService) { }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
  getRecipes() {
    console.log('get recipes method called ');
    console.log(this.recipes);
    return this.recipes.slice();

  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
    this.toastr.info('Ingredients added to shopping list', 'Add to Shopping List');
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
    this.toastr.info('New Recipe Added', 'Add Action');
  }
  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
    this.toastr.info('Recipe Updated', 'Update Action');
  }

  deleteRecipe(index: number) {

    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
    this.toastr.warning('Recipe Deleted', 'Delete Action');
  }
}