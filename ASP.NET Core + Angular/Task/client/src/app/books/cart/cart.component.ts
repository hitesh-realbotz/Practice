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
  cart: Cart | undefined;
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

    this.cartService.getCart();
    //Subscribe to ItemsChanges
    this.componentSubscriptions.add(
      this.subService.getBookChanges().subscribe({
        next: (Books: Book[]) => {
            this.cartService.getCart();
        }
      })
    );

    //Subscribe to ItemsChanges
    this.componentSubscriptions.add(
      this.subService.getLoggedUserChanges().subscribe({
        next: (user: User | null) => {
          if (user != null) {           
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
            this.cart = undefined;
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
      },
      error: error => {
        this.toastr.warning(error.error.message);
      }
    });
  }

  //Decrease CartItem quantity
  decreaseQuantity( item: CartItem) {
    this.cartService.decreaseQty(item).subscribe({
      next: response => {
        if (!!response) {
          this.toastr.info("CartItem's quantity decremented!");
        } else {
          this.toastr.info("CartItem removed!");
        }
      },
      error: error => {
        this.toastr.warning(error.error.message);
      }
    })
  }

  //Increases CartItem quantity
  increaseQuantity(item: CartItem) {
    this.cartService.addToCart(item).subscribe({
      next: response => {
        this.toastr.info("CartItem's quantity incremented!");
      },
      error: error => {
        this.toastr.warning(error.error.message);
      }
    })
  }


  //Toggles checkbox for CartItem selection
  toggleItemCheck(item: CartItem) {
    
    this.cartService.toggleCheckItem(item).subscribe({
      next: response => {
        this.toastr.info("CartItem Toggled!!");
      },
      error: error => {
        this.toastr.warning(error.error.message);
      }
    })
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
