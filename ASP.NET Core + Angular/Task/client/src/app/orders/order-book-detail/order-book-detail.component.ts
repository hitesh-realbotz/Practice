import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrderBook, OrderItem } from 'src/app/_models/order';
import { OrderService } from 'src/app/_services/order.service';
import { SubscriptionsService } from 'src/app/_services/subscriptions.service';

@Component({
  selector: 'app-order-book-detail',
  templateUrl: './order-book-detail.component.html',
  styleUrls: ['./order-book-detail.component.css']
})
export class OrderBookDetailComponent implements OnInit, OnDestroy {
  orderItem!: OrderItem | null;
  componentSubscriptions = new Subscription();
  
  constructor(
    private orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute,
    private subService: SubscriptionsService) { }

  ngOnInit() {
    console.log("Orderdetail component");
    this.route.data.subscribe({
      next: data => this.orderItem = data['orderItem']
    });
  }


  //Navigates to BookDetail onClick of LetsShop
  onLetsShop() {
    // this.router.navigate(['items', 'orders', this.index, orderItem.itemId]);
    this.router.navigate(['/book', this.orderItem?.orderBook?.isbn]);
  }

  //Unsubscribe to all subscriptions
  ngOnDestroy() {
    this.componentSubscriptions.unsubscribe();
  }

}

