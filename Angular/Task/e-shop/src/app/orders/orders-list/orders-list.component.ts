import { Component, OnInit } from '@angular/core';
import { Order } from '../order.model';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/users/user.service';
import { User } from 'src/app/auth/user.model';
import { OrderService } from '../orders.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {

  orders: Order[];
  subscription: Subscription;

  constructor(
    private orderService: OrderService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.userService.loggedUserChanged.subscribe(
      (user: User) => {
        this.initProcess();
      });

    this.subscription = this.orderService.ordersChanged.subscribe(
      (orders: Order[]) => {
        this.initProcess();
      });
  }

  initProcess() {
    if (!!this.userService.loggedUser && !!this.orderService.orderDetList) {
      if (this.router.url.includes('shop')) {
        this.orders = this.orderService.getOrdersBySellerId(this.userService.loggedUser.id);
      } else {
        this.orders = this.orderService.getOrdersByBuyerId(this.userService.loggedUser.id);
      }
    }
  }

  onOrder(index) {
    this.router.navigate([index], { relativeTo: this.route.parent })
  }





}




