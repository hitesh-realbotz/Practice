// import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// import { Recipe } from '../../recipe.model';

// @Component({
//   selector: 'app-recipe-item',
//   templateUrl: './recipe-item.component.html',
//   styleUrls: ['./recipe-item.component.css']
// })
// export class RecipeItemComponent implements OnInit {

//   @Input('recipe') recipe: Recipe;
//   @Output() recipeSelected = new EventEmitter<void>();

//   onSelected(){
//     this.recipeSelected.emit();
//   }

//   ngOnInit(): void { }
// }


// // From Services
// import { Component, Input, OnInit } from '@angular/core';
// import { Recipe } from '../../recipe.model';
// import { RecipeService } from '../../recipe.service';

// @Component({
//   selector: 'app-recipe-item',
//   templateUrl: './recipe-item.component.html',
//   styleUrls: ['./recipe-item.component.css']
// })
// export class RecipeItemComponent implements OnInit {

//   @Input('recipe') recipe: Recipe;

//   constructor(private recipeService: RecipeService) { }

//   onSelected() {
//     this.recipeService.recipeSelected.emit(this.recipe)
//   }

//   ngOnInit(): void { }

// }


// From Routing
import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input('recipe') recipe: Recipe;
  @Input() index: number;

  ngOnInit(): void { }


}
