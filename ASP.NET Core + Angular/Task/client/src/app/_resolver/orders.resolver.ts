import { ResolveFn } from '@angular/router';
import { PaginatedResult } from '../_models/Helpers/pagination';
import { Order } from '../_models/order';
import { Observable, tap } from 'rxjs';
import { inject } from '@angular/core';
import { OrderService } from '../_services/order.service';

export const ordersResolver: ResolveFn< | boolean | Order[] | PaginatedResult<Order[]> | Observable<PaginatedResult<Order[]>> | Promise<PaginatedResult<Order[]>>
> = (route, state) => {
  const orderService = inject(OrderService);
 
  return orderService.getOrders(orderService.getOrderParams())
  .pipe( tap (
    response => {
        if (response.result && response.pagination) {
          orderService.pagination = response.pagination;
          orderService.setOrders(response.result);
        }
      }
    )
    )
};
