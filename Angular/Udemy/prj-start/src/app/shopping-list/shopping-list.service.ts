// // Before Forms
// import { EventEmitter } from "@angular/core";
// import { Ingredient } from "../shared/ingredient.model";
// import { Subject } from "rxjs";

// export class ShoppingListService {
//     // ingredientsChanged = new EventEmitter<Ingredient[]>();
//     ingredientsChanged = new Subject<Ingredient[]>();

//     private ingredients: Ingredient[] = [
//         new Ingredient('Apples', 5),
//         new Ingredient('Tomatoes', 10),
//     ];

//     getIngredients(){
//         return this.ingredients.slice();
//     }
//     addIngredient(ingredient: Ingredient){
//         this.ingredients.push(ingredient);
//         // this.ingredientsChanged.emit(this.ingredients.slice());
//         this.ingredientsChanged.next(this.ingredients.slice());
//     }

//     addIngredients(ingredients: Ingredient[]){
//         // for (const ingredient of ingredients) {
//         //     this.addIngredient(ingredient)
//         // }
//         this.ingredients.push(...ingredients);
//         // this.ingredientsChanged.emit(this.ingredients.slice());
//         this.ingredientsChanged.next(this.ingredients.slice());
//     }
// }


// From Forms
import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class ShoppingListService {
    // ingredientsChanged = new EventEmitter<Ingredient[]>();
    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();

    constructor(private toastr: ToastrService) { }

    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
    ];

    getIngredients(){
        return this.ingredients.slice();
    }

    getIngredient(index: number){
        return this.ingredients[index];
    }

    addIngredient(ingredient: Ingredient){
        this.ingredients.push(ingredient);
        // this.ingredientsChanged.emit(this.ingredients.slice());
        this.ingredientsChanged.next(this.ingredients.slice());
        this.toastr.success('Ingredient Added');
    }

    addIngredients(ingredients: Ingredient[]){
        // for (const ingredient of ingredients) {
        //     this.addIngredient(ingredient)
        // }
        this.ingredients.push(...ingredients);
        // this.ingredientsChanged.emit(this.ingredients.slice());
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    updateIngredient(index: number, newIngredient: Ingredient){
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
        this.toastr.info('Ingredient updated');
    }

    deleteIngredient(index: number){
        this.ingredients.splice(index,1);
        this.ingredientsChanged.next(this.ingredients.slice());
        this.toastr.warning('Ingredient removed');
    }

}