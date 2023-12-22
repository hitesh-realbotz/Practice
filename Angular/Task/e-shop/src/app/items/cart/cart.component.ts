import { Component, OnDestroy, OnInit } from '@angular/core';
import { Item } from '../item.model';
import { Subscription } from 'rxjs';
import { ItemsService } from '../items.service';
import { UserService } from 'src/app/users/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from './cartItem.model';
import { User } from 'src/app/auth/user.model';
import { ToastrService } from 'ngx-toastr';
import { CartService } from './cart.service';
import { SubscriptionService } from 'src/app/shared/subscriptions.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  items: CartItem[] = [];
  totalCartAmount: number;
  totalSelectedCartAmount: number;
  componentSubscriptions = new Subscription();


  constructor(private itemService: ItemsService,
    private userService: UserService,
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private subService: SubscriptionService) { }

  ngOnInit() {

    //Subscribe to LoggedUserChanges
    this.componentSubscriptions.add(
      this.subService.getLoggedUserChanges().subscribe(
        (user: User) => {
          // !!user ? '' : this.items = [];
          this.cartService.getItems();
        })
    );

    //Subscribe to ItemsChanges
    this.componentSubscriptions.add(
      this.subService.getItemChanges().subscribe(
        (Items: Item[]) => {
          this.cartService.getItems();
        })
    );

    //Subscribe to CartItemsChanges
    this.componentSubscriptions.add(
      this.subService.getCartItemChangesChanges().subscribe(
        (items: CartItem[]) => {
          // if (!!items) {
            this.items = items;
            this.totalCartAmount = this.cartService.totalCartAmount;
            this.totalSelectedCartAmount = this.cartService.totalSelectedCartAmount;
          // }
        }
      )
    );
  }

  //Removes Cart Items
  onClearCart() {
    this.items = this.cartService.clearCart();
  }

  //Decrease CartItem quantity
  decreaseQuantity(index: number, itemEl: CartItem) {
    console.log('index : ', index);
    console.log('itemEl : ', itemEl);
    // this.itemService.AddToCart(null, itemEl, true);
    this.cartService.AddToCart(null, itemEl, true);
  }

  //Increases CartItem quantity
  increaseQuantity(itemEl: CartItem) {
    console.log('itemEl : ', itemEl);
    // this.itemService.AddToCart(null, itemEl, null);
    this.cartService.AddToCart(null, itemEl, null);
  }

  //Toggles checkbox for CartItem selection
  toggleItemCheck(index: number) {
    this.cartService.cartItems[index].checked = !this.cartService.cartItems[index].checked;
    this.cartService.calculateTotalAmount();
    this.cartService.cartItemsChanged.next(this.cartService.cartItems);
    const userIndex = this.userService.loggedUserIndex;
    const usersDetList = JSON.parse(localStorage.getItem('usersDetailList'));
    const localUserCart: { id: number, qty: number, checked: boolean }[] = usersDetList[userIndex].cart;
    for (const localCartItem of localUserCart) {
      if (localCartItem.id === this.cartService.cartItems[index].item.itemId) {
        localCartItem.checked = !localCartItem.checked;
      }
    }
    localStorage.setItem('usersDetailList', JSON.stringify(usersDetList));
  }

  //Redirects to Payment Page
  onCheckout() {
    // this.router.navigate(['items/payment'], { relativeTo: this.route });
    this.router.navigate(['items/payment']);
  }


  //Unsubscribe to all subscriptions
  ngOnDestroy() {
    this.componentSubscriptions.unsubscribe();
  }

}
