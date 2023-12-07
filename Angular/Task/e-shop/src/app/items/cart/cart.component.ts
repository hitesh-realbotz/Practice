import { Component, OnInit } from '@angular/core';
import { Item } from '../item.model';
import { Subscription } from 'rxjs';
import { ItemsService } from '../items.service';
import { UserService } from 'src/app/users/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items: Item[];
  subscription: Subscription;

  constructor(private itemService: ItemsService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {

    this.subscription = this.itemService.cartItemsChanged.subscribe(
      (Items: Item[]) => {
        this.items = Items;
      }
    );

    this.items = this.itemService.cartItems;

    // const userIndex = this.userService.loggedUserIndex;

    // const usersDetList = JSON.parse(localStorage.getItem('usersDetailList'));
    // const userCart: number[] = usersDetList[userIndex].cart;
    // this.items = this.itemService.getItemsById(userCart);
    

  }
  onClearCart(){
    const userIndex = this.userService.loggedUserIndex;
    this.items = [];
    const usersDetList = JSON.parse(localStorage.getItem('usersDetailList'));
    usersDetList[userIndex].cart = [];
    localStorage.setItem('usersDetailList', JSON.stringify(usersDetList));
  }

}
