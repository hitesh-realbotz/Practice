import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { CartService } from '../_services/cart.service';
import { OrderService } from '../_services/order.service';
import { Subscription } from 'rxjs';
import { SubscriptionsService } from '../_services/subscriptions.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy {
  user: User = {} as User;
  isAuthenticated = false;
  cartItemCount: number = 0;
  ordersCount: number = 0;
  componentSubscriptions = new Subscription();

  constructor(public accountService: AccountService, public userService: UserService, private subService: SubscriptionsService) { }
  ngOnInit(): void {
    // this.componentSubscriptions.add(this.userService.getUserDashboardStat().subscribe({
    //   next: data => {
    //     this.cartItemCount = data.cartItemsCount;
    //     this.ordersCount = data.ordersCount;
    //   }
    // }));
    this.componentSubscriptions.add(this.subService.getLoggedUserChanges().subscribe({
      next: data => {
        this.user = !!data ? data : {} as User;
        this.isAuthenticated = !!data;
        if (!!data) {
          this.userService.getUserDashboardStat().subscribe({
            next: data => {
              this.cartItemCount = data.cartItemsCount;
              this.ordersCount = data.ordersCount;
            }
          });
        }
      }
    }));
    this.componentSubscriptions.add(this.subService.getCartChanges().subscribe({
      next: cart => {
        this.cartItemCount = !!cart?.cartItems.length ? cart.cartItems.length : 0;
      }
    }));

  }

  getUserStats() {

  }


  onLogout() {
    this.accountService.logout();
  }

  ngOnDestroy(): void {
    this.componentSubscriptions.unsubscribe();
  }
}
