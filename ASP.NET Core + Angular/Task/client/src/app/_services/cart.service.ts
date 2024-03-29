import { Injectable } from '@angular/core';
import { AccountService } from './account.service';
import { BookService } from './book.service';
import { CartItem } from '../_models/cartItem';
import { BehaviorSubject, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Cart } from '../_models/cart';
import { Book } from '../_models/book';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  baseUrl = environment.apiUrl;
  cartChanged = new BehaviorSubject<Cart | null>(null);
  cart!: Cart | null;
  totalCartAmount: number = 0;
  totalSelectedCartAmount: number = 0;

  constructor(private http: HttpClient, private toastr: ToastrService, private bookService: BookService, private accountService: AccountService) { }

  //Gets user cart
  getCart() {
    return this.http.get<Cart>(this.baseUrl + 'cart/')
      .pipe(
        tap(response => {
          if (response) {
            this.setCartItems(response);
          }
        })
      );
  }

  //Gets total price for all cart items which marked as checked
  getCheckedCartItemsPrice() {
    return this.http.get<Cart>(this.baseUrl + 'cart/checked-item-price')
      .pipe(
        tap(response => {
          if (response) {
            this.setCartItems(response);
          }
        })
      );
  }

  //Adds book to cart or increases quantity
  addToCart(cartItem: CartItem) {
    return this.http.post<Cart>(this.baseUrl + 'cart', cartItem)
      .pipe(
        tap(response => {
          if (response) {
            this.setCartItems(response);
          }
        })
      );
  }

  //Adds book to cart or increases quantity from BookList or BookDetails page
  addToCartFromItem(book: Book) {
    const cartItem = new CartItem(book, 1, book.unitPrice, true);
    return this.addToCart(cartItem);
  }

  //Removes item from cart or Decreases quantity
  decreaseQty(cartItem: CartItem) {
    return this.http.post<Cart>(this.baseUrl + 'cart/decrease-qty', cartItem)
      .pipe(
        tap(response => {
          // if (response) {
          this.cart = response;
          this.cartChanged.next(this.cart);
          // }
        })
      );
  }

  //Toggles cart item's checked status
  toggleCheckItem(cartItem: CartItem) {
    return this.http.post<Cart>(this.baseUrl + 'cart/toggle-check', cartItem)
      .pipe(
        tap(response => {
          if (response) {
            this.setCartItems(response);
          }
        })
      );
  }

  //Clears cart
  clearCart() {
    return this.http.delete<boolean>(this.baseUrl + 'cart')
      .pipe(
        tap(bool => {
          if (bool) {
            this.cart = null;
            this.cartChanged.next(null);
          }
        })
      );
  }


  //Set local cart
  setCartItems(cart: Cart | null) {
    this.cart = cart;
    this.cartChanged.next(this.cart);
  }

}
