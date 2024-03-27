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
  cart: Cart | undefined;
  totalCartAmount: number = 0;
  totalSelectedCartAmount: number = 0;

  constructor(private http: HttpClient, private toastr: ToastrService, private bookService: BookService, private accountService: AccountService) { }

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
  decreaseQty(cartItem: CartItem) {
    return this.http.post<Cart>(this.baseUrl + 'cart/decrease-qty', cartItem)
      .pipe(
        tap(response => {
          if (response) {
            this.cart = response;
            this.cartChanged.next(this.cart);
          }
        })
      );
  }

  toggleCheckItem(cartItem: CartItem){
    return this.http.post<Cart>(this.baseUrl + 'cart/toggle-check', cartItem)
      .pipe(
        tap(response => {
          if (response) {
            this.setCartItems(response);
          }
        })
      );
  }

  clearCart() {
    return this.http.delete<boolean>(this.baseUrl + 'cart')
      .pipe(
        tap(bool => {
          if (bool) {
            this.cart = undefined;
            this.cartChanged.next(null);
          }
        })
      );
  }

  addToCartFromItem(book: Book) {
    const cartItem = new CartItem(book, 1, book.price, true);
    return this.addToCart(cartItem);
  }

  setCartItems(cart: Cart) {
    this.cart = cart;
    this.cartChanged.next(this.cart);
  }

}