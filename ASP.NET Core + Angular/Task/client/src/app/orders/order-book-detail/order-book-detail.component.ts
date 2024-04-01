import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {  OrderItem } from 'src/app/_models/order';


@Component({
  selector: 'app-order-book-detail',
  templateUrl: './order-book-detail.component.html',
  styleUrls: ['./order-book-detail.component.css']
})
export class OrderBookDetailComponent implements OnInit, OnDestroy {
  orderItem!: OrderItem | null;
  componentSubscriptions = new Subscription();

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
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

