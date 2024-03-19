import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Book } from 'src/app/_models/book';
import { Cart } from 'src/app/_models/cart';
import { CartItem } from 'src/app/_models/cartItem';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { BookService } from 'src/app/_services/book.service';
import { CartService } from 'src/app/_services/cart.service';
import { SubscriptionsService } from 'src/app/_services/subscriptions.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  items: Cart | undefined;
  totalCartAmount: number = 0;
  totalSelectedCartAmount: number = 0;
  componentSubscriptions = new Subscription();


  constructor(private bookService: BookService,
    private accountService: AccountService,
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private subService: SubscriptionsService) { }

  ngOnInit() {

    //Subscribe to LoggedUserChanges
    this.componentSubscriptions.add(
      
    );

    //Subscribe to ItemsChanges
    this.componentSubscriptions.add(
      this.subService.getBookChanges().subscribe(
        (Books: Book[]) => {
          // this.cartService.getItems();
        })
    );

    //Subscribe to CartItemsChanges
    this.componentSubscriptions.add(
      this.subService.getCartChangesChanges().subscribe(
        (items: Cart) => {
          // if (!!items) {
            this.items = items;
            console.log('CartItemst',this.cartService.cart);
            this.totalCartAmount = this.cartService.totalCartAmount;
            this.totalSelectedCartAmount = this.cartService.totalSelectedCartAmount;
          // }
        }
      )
    );
  }

  //Removes Cart Items
  onClearCart() {
    // this.items = this.cartService.clearCart();
  }

  //Decrease CartItem quantity
  decreaseQuantity(index: number, itemEl: CartItem) {
    console.log('index : ', index);
    console.log('itemEl : ', itemEl);
    // this.cartService.AddToCart(null, itemEl, true);
  }

  //Increases CartItem quantity
  increaseQuantity(itemEl: CartItem) {
    console.log('itemEl : ', itemEl);
    // this.cartService.AddToCart(null, itemEl, null);
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
