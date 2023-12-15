import { Component, OnInit } from '@angular/core';
import { Order } from '../order.model';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/users/user.service';
import { User } from 'src/app/auth/user.model';
import { OrderService } from '../orders.service';
import { Item } from 'src/app/items/item.model';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {

  orders: Order[];
  subscription: Subscription;
  showActions: boolean = false;

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
    this.router.navigate([index], { relativeTo: this.route });
  }
  // onItem(event: Event, orderEl, orderItem) {
  //   event.stopPropagation();
  //   const item= this.orderService.getItemById(orderItem.itemId);
  //   console.log(item);
    
  //   if (!!item && this.isEqualToItem(orderItem, item)) {
  //     const index = this.orderService.getItemIndexById(item.itemId);
  //     this.router.navigate([ 'items', index]);
  //   } else {
  //     // this.router.navigate([ 'items', orderEl.orderId, orderItem.itemId], { relativeTo: this.route });
  //     this.router.navigate([ 'items','orders', orderEl.orderId, orderItem.itemId]);
  //   }
    
  // }
  onItem(event: Event, orderEl, orderItem) {
    event.stopPropagation();  
      this.router.navigate([ 'items','orders', orderEl.orderId, orderItem.itemId]);
  }

  onShowActions() {
    this.showActions = true;
  }
  onHideActions() {
    this.showActions = false;
  }

}




