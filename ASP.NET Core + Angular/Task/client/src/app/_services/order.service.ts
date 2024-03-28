import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order, OrderBook, OrderItem } from '../_models/order';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cart } from '../_models/cart';
import { OrderParams } from '../_models/orderParams';
import { PaginatedResult, Pagination } from '../_models/Helpers/pagination';
import { getPaginatedResult, getPaginationHeaders } from '../_models/Helpers/paginationHelper';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseUrl = environment.apiUrl;
  ordersChanged = new BehaviorSubject<Order[] | null>(null);
  orders: Order[] = [];
  orderParams: OrderParams = new OrderParams();
  pagination: Pagination | undefined;

  constructor(private http: HttpClient) { }

  getOrderParams() {
    return this.orderParams;
  }

  setOrderParams(orderParams: OrderParams) {
    this.orderParams = orderParams;
  }

  resetOrderParams() {
    this.orderParams = new OrderParams();
    return true;
  }

  placeOrder(model: any) {
    return this.http.post<Order>(this.baseUrl + 'order', model)
      .pipe(
        tap(response => {
          if (response) {   
            // let orders = [response];
            this.orders.push(response);         
            this.setOrders(this.orders);
          }
        })
      );
  }

  getOrders(orderParams: OrderParams) {
    let params = getPaginationHeaders(this.orderParams.pageNumber, this.orderParams.pageSize);
    params = params.append('SortBy', this.orderParams.sortBy);
    params = params.append('SortOrder', this.orderParams.sortOrder);

    return getPaginatedResult<Order[]>(this.baseUrl + 'order', params, this.http);
    // return this.http.get<Order[]>(this.baseUrl + 'order/')
    //   .pipe(
    //     tap(response => {
    //       if (response) {
    //         this.setOrders(response);
    //       }
    //     })
    //   );
  }

  getOrder(id: number) {
    return this.http.get<Order>(this.baseUrl + 'order/'+id);
  }
  
  getOrderItem(id: number, id2: string) {
    return this.http.get<OrderItem>(this.baseUrl + 'order/'+id+'/'+id2);
  }

  setOrders(orders: Order[]) {
    this.orders = orders;
    this.ordersChanged.next(this.orders);
  }
  setOrdersFromResolver(paginatedResult: PaginatedResult<Order[]>) {
    if (paginatedResult && paginatedResult.result) {
      this.orders = paginatedResult.result; // Extract orders from paginated result
      this.ordersChanged.next(this.orders);
    }
  }

}
