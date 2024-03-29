import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { CartService } from '../_services/cart.service';
import { Cart } from '../_models/cart';
import { Observable, catchError, of, tap } from 'rxjs';
import { SubscriptionsService } from '../_services/subscriptions.service';
import { User } from '../_models/user';

export const cartResolver: ResolveFn<
  boolean | Cart | Observable<Cart> | Promise<Cart>
> = (route, state) => {
  const cartService = inject(CartService);
  const subService = inject(SubscriptionsService);
  let isAuthenticated: boolean = false;
  subService.getLoggedUserChanges().subscribe({
    next: (user: User | null) => {
      if (user != null) {
        isAuthenticated = true;
      }
      return true;
    },
  });

  if (isAuthenticated) {
    return cartService.getCart().pipe(
      tap((response) => {
        if (!!response) {
          cartService.setCartItems(response);
        } else {
          cartService.setCartItems(null);
        }
        return true;
      }),
      catchError((error) => {
        cartService.setCartItems(null);
        return of(true);
      })
    );
  }
  return true;
};
