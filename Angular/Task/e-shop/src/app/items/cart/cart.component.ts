import { Component, OnInit } from '@angular/core';
import { Item } from '../item.model';
import { Subscription } from 'rxjs';
import { ItemsService } from '../items.service';
import { UserService } from 'src/app/users/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from './cartItem.model';
import { User } from 'src/app/auth/user.model';
import { ToastrService } from 'ngx-toastr';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items: CartItem[] = [];
  totalCartAmount: number;
  totalSelectedCartAmount: number;
  subscription: Subscription;


  constructor(private itemService: ItemsService,
    private userService: UserService,
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,) { }

  ngOnInit() {

    this.userService.loggedUserChanged.subscribe(
      (user: User) => {
        console.log('loggedUserChanged.subscribe');
        this.cartService.getItems();
      }
    );
    this.itemService.itemChanged.subscribe(
      (items: Item[]) => {
        console.log('itemChanged.subscribe');
        this.cartService.getItems();

      }
    );

    this.subscription = this.cartService.cartItemsChanged.subscribe(
      (items: CartItem[]) => {
        if (!!items) {
          this.items = items;
          this.totalCartAmount = this.cartService.totalCartAmount;
          this.totalSelectedCartAmount = this.cartService.totalSelectedCartAmount;
        }
      }
    );
  }

  onClearCart() {
    this.items = this.cartService.clearCart();
  }

  decreaseQuantity(index: number, itemEl: CartItem) {
    console.log('index : ', index);
    console.log('itemEl : ', itemEl);
    // this.itemService.AddToCart(null, itemEl, true);
    this.cartService.AddToCart(null, itemEl, true);
  }
  increaseQuantity(itemEl: CartItem) {
    console.log('itemEl : ', itemEl);
    // this.itemService.AddToCart(null, itemEl, null);
    this.cartService.AddToCart(null, itemEl, null);
  }

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

  onCheckout() {
    // this.router.navigate(['items/payment'], { relativeTo: this.route });
    this.router.navigate(['items/payment']);
  }

}
