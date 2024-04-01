import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { OrderService } from '../_services/order.service';
import { Order } from '../_models/order';

export const orderDetailResolver: ResolveFn<Order> = (route, state) => {
  console.log('orderResolver');
  const orderService = inject(OrderService);

  return orderService.getOrder(+route.paramMap.get('id')!);
};
