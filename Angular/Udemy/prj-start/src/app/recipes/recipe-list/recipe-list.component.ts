// import { Component, EventEmitter, OnInit, Output } from '@angular/core';
// import { Recipe } from '../recipe.model';

// @Component({
//   selector: 'app-recipe-list',
//   templateUrl: './recipe-list.component.html',
//   styleUrls: ['./recipe-list.component.css']
// })
// export class RecipeListComponent implements OnInit {

//   recipes: Recipe[] = [
//     new Recipe('A Test Recipe', 'This is simple test', 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1170&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
//     new Recipe('Another Test Recipe', 'This is simple another test', 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1170&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
//   ];

//   @Output() recipeWasSelected = new EventEmitter<Recipe>();

//   constructor() { }

//   onRecipeSelected(recipe: Recipe) {
//     this.recipeWasSelected.emit(recipe);
//   }
//   ngOnInit() { }

// }




import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[];
 
  constructor(private recipeService: RecipeService) {
    
  }
  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
  }
  

}

