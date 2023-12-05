import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../items.service';
import { Item } from '../item.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserService } from 'src/app/users/user.service';

@Component({
  selector: 'app-items-detail',
  templateUrl: './items-detail.component.html',
  styleUrls: ['./items-detail.component.css']
})
export class ItemsDetailComponent  implements OnInit {

  item: Item;
  id: number;
  role: string;
  constructor(private itemService: ItemsService,
              private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.role = this.userService.loggedUser.role;

    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        if(this.router.url.includes('shop')){
          this.id = this.itemService.sellerItemsIndex[this.id];
        }
        console.log('Id is : ' + this.id);
        this.item = this.itemService.getItem(this.id);
      }
    );
  }

  onAddToShoppingList() {
    // this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditItem() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteRecipe() {
    // this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

}
