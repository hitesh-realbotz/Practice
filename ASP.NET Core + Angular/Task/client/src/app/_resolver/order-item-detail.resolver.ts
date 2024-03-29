import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { OrderService } from '../_services/order.service';
import { OrderItem } from '../_models/order';

export const orderItemDetailResolver: ResolveFn<OrderItem> = (route, state) => {
  const orderService = inject(OrderService);

  return orderService.getOrderItem(+route.paramMap.get('id')!, route.paramMap.get('id2')!);
};
