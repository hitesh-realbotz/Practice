import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { CartService } from '../_services/cart.service';

export const cartResolver: ResolveFn<boolean> = (route, state) => {

const cartService = inject(CartService);
cartService.getCart()
    .subscribe({
      next: response => {
        if (!!response) {
          cartService.setCartItems(response);
        }
        return true;
      }
    });
  
  return true;
};
