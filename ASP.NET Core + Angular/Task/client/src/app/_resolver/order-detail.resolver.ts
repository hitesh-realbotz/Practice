import { inject } from '@angular/core';
import { Params, ResolveFn } from '@angular/router';
import { SubscriptionsService } from '../_services/subscriptions.service';
import { OrderService } from '../_services/order.service';
import { User } from '../_models/user';
import { catchError, tap } from 'rxjs';
import { Order } from '../_models/order';

export const orderDetailResolver: ResolveFn<Order> = (route, state) => {
  console.log('orderResolver');
  const subService = inject(SubscriptionsService);
  const orderService = inject(OrderService);

  return orderService.getOrder(+route.paramMap.get('id')!);
};
