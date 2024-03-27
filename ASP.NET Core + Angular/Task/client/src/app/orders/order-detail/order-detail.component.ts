import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Order, OrderItem } from 'src/app/_models/order';
import { OrderService } from 'src/app/_services/order.service';
import { SubscriptionsService } from 'src/app/_services/subscriptions.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent  implements OnInit, OnDestroy {
  order!: Order | null;
  componentSubscriptions = new Subscription();
  
  constructor(
    private orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute,
    private subService: SubscriptionsService) { }

  ngOnInit() {
    console.log("Orderdetail component");
    this.route.data.subscribe({
      next: data => this.order = data['order']
    });
  }


  // //Navigates to ItemDetail onClick of particular Item in Order
  // onItem(event: Event, orderItem: OrderItem) {
  //   // this.router.navigate(['items', 'orders', this.index, orderItem.itemId]);
  // }
  //Navigates to ItemDetail onClick of particular Item in Order
  onItem(event: Event, orderEl: Order, orderItem: OrderItem) {
    event.stopPropagation();
    this.router.navigate(['order', orderEl.id, orderItem.orderBook?.isbn]);
  }

  //Unsubscribe to all subscriptions
  ngOnDestroy() {
    this.componentSubscriptions.unsubscribe();
  }

}
