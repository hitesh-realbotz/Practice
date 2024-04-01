import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order, OrderItem } from '../_models/order';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
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

  //Gets OrderParams
  getOrderParams() {
    return this.orderParams;
  }

  //Sets OrderParams
  setOrderParams(orderParams: OrderParams) {
    this.orderParams = orderParams;
  }

  //Resets OrderParams
  resetOrderParams() {
    this.orderParams = new OrderParams();
    return true;
  }

  //Creates new order
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

  //Get orders as per orderParams
  getOrders(orderParams: OrderParams) {
    let params = getPaginationHeaders(this.orderParams.pageNumber, this.orderParams.pageSize);
    params = params.append('SortBy', this.orderParams.sortBy);
    params = params.append('SortOrder', this.orderParams.sortOrder);

    return getPaginatedResult<Order[]>(this.baseUrl + 'order', params, this.http);
  }

  //Get order by orderID
  getOrder(id: number) {
    return this.http.get<Order>(this.baseUrl + 'order/' + id);
  }

  //Get orderedItem by orderID & orderedItem's ISBNCode
  getOrderItem(id: number, id2: string) {
    return this.http.get<OrderItem>(this.baseUrl + 'order/' + id + '/' + id2);
  }

  //Setb local orders
  setOrders(orders: Order[]) {
    this.orders = orders;
    this.ordersChanged.next(this.orders);
  }

  //Set local orders from Paginated result
  setOrdersFromResolver(paginatedResult: PaginatedResult<Order[]>) {
    if (paginatedResult && paginatedResult.result) {
      this.orders = paginatedResult.result; // Extract orders from paginated result
      this.ordersChanged.next(this.orders);
    }
  }

}
