import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../_models/order';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cart } from '../_models/cart';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseUrl = environment.apiUrl;
  ordersChanged = new BehaviorSubject<Order[] | null>(null);
  orders: Order[] = [];

  constructor(private http: HttpClient) { }

  placeOrder(cart: Cart) {
    return this.http.post<Order>(this.baseUrl + 'order', cart)
      .pipe(
        tap(response => {
          if (response) {            
            // this.setOrders(response);
          }
        })
      );
  }

  getOrders() {
    return this.http.get<Order[]>(this.baseUrl + 'order/')
      .pipe(
        tap(response => {
          if (response) {
            this.setOrders(response);
          }
        })
      );
  }

  setOrders(orders: Order[]) {
    this.orders = orders;
    this.ordersChanged.next(this.orders);
  }

}
