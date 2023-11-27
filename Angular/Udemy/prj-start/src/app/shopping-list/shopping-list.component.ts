// import { Component, OnInit } from '@angular/core';
// import { Ingredient } from '../shared/ingredient.model';

// @Component({
//   selector: 'app-shopping-list',
//   templateUrl: './shopping-list.component.html',
//   styleUrls: ['./shopping-list.component.css']
// })
// export class ShoppingListComponent implements OnInit {

//   ingredients: Ingredient[] = [
//     new Ingredient('Apples', 5),
//     new Ingredient('Tomatoes', 10),
//   ];
  
//   constructor() {
    
//   }
//   ngOnInit() {
    
//   }

//   onIngredientAdded(ingredient: Ingredient){
//     this.ingredients.push(ingredient);
//   }
// }

// // Before Forms
// import { Component, OnDestroy, OnInit } from '@angular/core';
// import { Ingredient } from '../shared/ingredient.model';
// import { ShoppingListService } from './shopping-list.service';
// import { Subscription } from 'rxjs';

// @Component({
//   selector: 'app-shopping-list',
//   templateUrl: './shopping-list.component.html',
//   styleUrls: ['./shopping-list.component.css']
// })
// export class ShoppingListComponent implements OnInit, OnDestroy {

//   ingredients: Ingredient[] ;
//   private igChangeSub: Subscription;
  
//   constructor(private slService: ShoppingListService) { }

//   ngOnDestroy(): void {
//     this.igChangeSub.unsubscribe();
//   }

//   ngOnInit() {
//     this.ingredients = this.slService.getIngredients();
//     this.igChangeSub = this.slService.ingredientsChanged.subscribe(
//       (ingredients: Ingredient[]) => {
//         this.ingredients = ingredients;
//       }
//     )
//   }
// }


// From Forms
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[] ;
  private igChangeSub: Subscription;
  
  constructor(private slService: ShoppingListService, private loggingService: LoggingService) { }

  ngOnDestroy(): void {
    this.igChangeSub.unsubscribe();
  }

  ngOnInit() {
    console.log('ShoppingList InIt called');
    this.ingredients = this.slService.getIngredients();
    this.igChangeSub = this.slService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );

    this.loggingService.printLog('Hello from ShoppingListComponent ngOnInit');
  }

  onEditItem(index: number){
    this.slService.startedEditing.next( index );
  }
}
