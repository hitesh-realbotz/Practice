import { Injectable } from '@angular/core';
import { AccountService } from './account.service';
import { BookService } from './book.service';
import { CartService } from './cart.service';
import { OrderService } from './order.service';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsService {

  constructor(private accountService: AccountService, 
    private bookService: BookService,
    private orderService: OrderService,
    private cartService: CartService) { }

getLoggedUserChanges(){
return this.accountService.currentUserSource;
}
getBookChanges(){
return this.bookService.bookChanged;
}
getOrderChanges(){
return this.orderService.ordersChanged;
}
getCartChanges(){
return this.cartService.cartChanged;
}


}
