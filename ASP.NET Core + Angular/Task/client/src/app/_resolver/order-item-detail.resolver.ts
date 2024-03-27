import { ResolveFn } from '@angular/router';
import { SubscriptionsService } from '../_services/subscriptions.service';
import { inject } from '@angular/core';
import { OrderService } from '../_services/order.service';
import { OrderBook, OrderItem } from '../_models/order';

export const orderItemDetailResolver: ResolveFn<OrderItem> = (route, state) => {
  const subService = inject(SubscriptionsService);
  const orderService = inject(OrderService);

  return orderService.getOrderItem(+route.paramMap.get('id')!, route.paramMap.get('id2')!);
};
