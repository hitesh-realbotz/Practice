import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
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
  cart!: Cart | null;
  totalCartAmount: number = 0;
  totalSelectedCartAmount: number = 0;
  componentSubscriptions = new Subscription();


  constructor(private bookService: BookService,
    private accountService: AccountService,
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private subService: SubscriptionsService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {

    // this.cartService.getCart();
    //Subscribe to ItemsChanges
    this.componentSubscriptions.add(
      this.subService.getBookChanges().subscribe({
        next: (Books) => {
            this.cartService.getCart();
        }
      })
    );

    //Subscribe to ItemsChanges
    this.componentSubscriptions.add(
      this.subService.getLoggedUserChanges().subscribe({
        next: (user: User | null) => {
          console.log('logUser Subscribed');
          console.log(!!user);
          if (!!user) {           
            this.cart = user.cart;
            this.cartService.getCart();
          }
        }
      })
    );

    //Subscribe to CartItemsChanges
    this.componentSubscriptions.add(
      this.subService.getCartChanges().subscribe({
        next: (cart: Cart | null) => {
          if (cart != null) {
            this.cart = cart;
            // this.cdr.detectChanges();
          }else{
            this.cart = null;
          }
        },
      }
      )
    );
  }

  //Removes Cart Items
  onClearCart() {
    this.cartService.clearCart().subscribe({
      next: response => {
        this.toastr.info("All CartItems Removed!");
      }
    });
  }

  //Decrease CartItem quantity
  decreaseQuantity(event: Event, item: CartItem) {
    event.stopPropagation();
    this.cartService.decreaseQty(item).subscribe({
      next: response => {
        if (!!response) {
          this.toastr.info("CartItem's quantity decremented!");
        } else {
          this.toastr.info("CartItem removed!");
        }
      }
    })
  }

  //Increases CartItem quantity
  increaseQuantity(event: Event, item: CartItem) {
    event.stopPropagation();
    this.cartService.addToCart(item).subscribe({
      next: response => {
        this.toastr.info("CartItem's quantity incremented!");
      }
    })
  }


  //Toggles checkbox for CartItem selection
  toggleItemCheck(event: Event, item: CartItem) {
    event.stopPropagation();
    this.cartService.toggleCheckItem(item).subscribe({
      next: response => {
        this.toastr.info("CartItem Toggled!!");
      }
    })
  }


  //Redirects to Payment Page
  onCheckout() {
    // this.router.navigate(['items/payment'], { relativeTo: this.route });
    this.router.navigate(['book/payment']);
  }

  onHome(){
    this.router.navigate(['/book']);
  }

   //Navigates to ItemDetail onClick of particular Item
   onItem(event: Event, item: CartItem) {
    event.stopPropagation();
    this.router.navigate([item.book.isbn], { relativeTo: this.route.parent })
    // this.router.navigate(['order', orderEl.id, orderItem.orderBook?.isbn]);
  }
  //Unsubscribe to all subscriptions
  ngOnDestroy() {
    this.componentSubscriptions.unsubscribe();
  }

}
