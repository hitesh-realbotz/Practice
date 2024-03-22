import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { OrderService } from '../_services/order.service';

export const ordersResolver: ResolveFn<boolean> = (route, state) => {
  const orderService = inject(OrderService);

  orderService.getOrders()
    .subscribe({
      next: response => {
        if (response){
          orderService.setOrders(response);
        }
        return true;
      }
    });
  return true;
};
