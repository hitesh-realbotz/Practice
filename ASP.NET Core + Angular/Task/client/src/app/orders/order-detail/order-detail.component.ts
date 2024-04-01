import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Order, OrderItem } from 'src/app/_models/order';


@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit, OnDestroy {
  order!: Order | null;
  componentSubscriptions = new Subscription();

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    console.log("Orderdetail component");
    this.route.data.subscribe({
      next: data => this.order = data['order']
    });
  }


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
