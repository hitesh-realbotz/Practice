import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { ItemsService } from 'src/app/items/items.service';
import { User } from 'src/app/auth/user.model';
import { Item } from 'src/app/items/item.model';
import { OrderService } from 'src/app/orders/orders.service';
import { CartService } from 'src/app/items/cart/cart.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Order } from 'src/app/orders/order.model';
import { Subscription } from 'rxjs';
import { SubscriptionService } from 'src/app/shared/subscriptions.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  role: string;
  componentSubscriptions = new Subscription();
  sellerItemCount: number = 0;
  orderCount: number = 0;
  sellerOrderCount: number = 0;
  cartItemCount: number = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private itemService: ItemsService,
    private orderService: OrderService,
    private cartService: CartService,
    private dataStorageService: DataStorageService,
    private subService: SubscriptionService) {

  }

  ngOnInit() {
    console.log("DashBoard Called================>");

    //Subscribe to LoggedUserChanges
    this.componentSubscriptions.add(
      this.subService.getLoggedUserChanges().subscribe(
        (user: User) => {
          !!this.userService.loggedUser ? this.role = this.userService.loggedUser.role : '';
          this.initProcess();
        })
    );

    //Subscribe to ItemsChanges
    this.componentSubscriptions.add(
      this.subService.getItemChanges().subscribe(
        (Items: Item[]) => {
          this.initProcess();
        })
    );

    //Subscribe to OrdersChanges
    this.componentSubscriptions.add(
      this.orderService.ordersChanged.subscribe(
        (orders: Order[]) => {
          this.initProcess();
        })
    );
  }

  initProcess() {
    if (!!this.userService.loggedUser && !!this.itemService.items) {
      // this.role = this.userService.loggedUser.role;
      this.cartItemCount = this.cartService.getItems().length;
      this.sellerItemCount = this.itemService.getItemsBySellerId(this.userService.loggedUser.id).length;
      if (!!this.orderService.orderDetList.length) {
        this.orderCount = this.orderService.getOrdersByBuyerId(this.userService.loggedUser.id).length;
        this.sellerOrderCount = this.orderService.getOrdersBySellerId(this.userService.loggedUser.id).length;
      }
    }
  }

  //Navigates to list of orders with buyerId == User's Id
  onMyOrders() {
    this.router.navigate(['/orders']);
  }

  //Navigates to list of orders received for item with sellerId == User's Id
  onShopOrders() {
    this.router.navigate(['/shop/orders']);
  }

  //Navigates to Cart
  onCart() {
    this.router.navigate(['cart'], { relativeTo: this.route });
  }

  //Navigates to UserProfile
  onProfile() {
    // this.router.navigate(['profile'], { relativeTo: this.route });
    this.router.navigate(['/user/profile']);
  }

  //Navigates to Shop Registration From if user is Buyer or Navigates to Shop section if User is Seller
  onGetOrCreateShop() {
    if (this.role === 'buyer') {
      this.router.navigate(['shop/details']);
    } else {
      this.router.navigate(['shop']);
    }
  }

  //Unsubscribe to all subscriptions
  ngOnDestroy() {
    this.componentSubscriptions.unsubscribe();
  }
}
