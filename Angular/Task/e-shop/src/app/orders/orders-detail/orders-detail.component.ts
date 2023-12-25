import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrderService } from '../orders.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from 'src/app/users/user.service';
import { Order } from '../order.model';
import { User } from 'src/app/auth/user.model';
import { Subscription } from 'rxjs';
import { SubscriptionService } from 'src/app/shared/subscriptions.service';

@Component({
  selector: 'app-orders-detail',
  templateUrl: './orders-detail.component.html',
  styleUrls: ['./orders-detail.component.css']
})
export class OrdersDetailComponent implements OnInit, OnDestroy {
  order: Order;
  componentSubscriptions = new Subscription();
  index: number;

  constructor(
    private orderService: OrderService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private subService: SubscriptionService) { }

  ngOnInit() {

    //Subscribe to RouteParameter
    this.componentSubscriptions.add(
      this.route.params.subscribe(
        (params: Params) => {
          this.index = +params['id'];
          this.initProcess();
        })
    );

    //Subscribe to LoggedUserChanges
    this.componentSubscriptions.add(
      this.subService.getLoggedUserChanges().subscribe(
        (user: User) => {
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
    if (!!this.userService.loggedUser && !!this.orderService.orderDetList && this.index != null) {
      if (this.router.url.includes('shop')) {
        // this.order = this.orderService.getOrdersBySellerId(this.userService.loggedUser.id);
        this.order = JSON.parse(JSON.stringify(this.orderService.getOrderById(this.index)));
        const orderedItems = [];
            let totalPrice = 0;
            for (const item of this.order.orderedItems) {
                if (item.sellerId === this.userService.loggedUser.id) {
                    orderedItems.push(item);
                    totalPrice += item.price;              
                }
            }
            this.order.orderedItems = orderedItems;
            this.order.totalPrice = totalPrice;
      }else {
        this.order = JSON.parse(JSON.stringify(this.orderService.getOrderById(this.index)));
      }
    }
  }

  //Navigates to ItemDetail onClick of particular Item in Order
  onItem(event: Event, orderItem) {
    this.router.navigate(['items', 'orders', this.index, orderItem.itemId]);
  }

  //Unsubscribe to all subscriptions
  ngOnDestroy() {
    this.componentSubscriptions.unsubscribe();
  }

}
