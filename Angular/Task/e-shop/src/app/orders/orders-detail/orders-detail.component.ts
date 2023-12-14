import { Component, OnInit } from '@angular/core';
import { OrderService } from '../orders.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from 'src/app/users/user.service';
import { Order } from '../order.model';
import { User } from 'src/app/auth/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-orders-detail',
  templateUrl: './orders-detail.component.html',
  styleUrls: ['./orders-detail.component.css']
})
export class OrdersDetailComponent implements OnInit {
  order: Order;
  subscription: Subscription;
  index: number;


  constructor(
    private orderService: OrderService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {

    // Use OrderEl.oredrID instead of index while fromlist to detail
    this.route.params.subscribe(
      (params: Params) => {
          this.index = +params['id'];
          console.log('this.index from param');
          console.log(this.index);
          this.initProcess();
        
      });

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
    if (!!this.userService.loggedUser && !!this.orderService.orderDetList && this.index != null) {
      this.order = this.orderService.getOrderById(this.index);
    }
  }



}
