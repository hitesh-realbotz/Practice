import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Pagination } from 'src/app/_models/Helpers/pagination';
import { BookParams } from 'src/app/_models/bookParams';
import { Constants } from 'src/app/_models/constants';
import { Order, OrderItem } from 'src/app/_models/order';
import { OrderParams } from 'src/app/_models/orderParams';
import { OrderService } from 'src/app/_services/order.service';
import { SubscriptionsService } from 'src/app/_services/subscriptions.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit, OnDestroy {
  orders: Order[] = [];
  orderParams: OrderParams | undefined;
  pagination: Pagination | undefined;
  sortForm: FormGroup = new FormGroup({});
  sortByOptions: string[] = [
    Constants.sortByDate,
    Constants.sortByPrice,
    Constants.sortById
  ];
  // sortOrderOptions: string[] = [Constants.sortOrderAsc, Constants.sortOrderDsc];
  sortOrderOptions: string[] = Constants.sortOrderOptions;
  pageSizeOptions: number[] = Constants.pageSizeOptions;
  componentSubscriptions = new Subscription();

  constructor(
    private orderService: OrderService,
    private fb: FormBuilder,
    private ngZone: NgZone,
    private subService: SubscriptionsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.orderParams = this.orderService.getOrderParams();
  }

  ngOnInit(): void {
    console.log('bookList Onint');
    this.sortForm = this.fb.group({
      sortBy: [this.orderParams?.sortBy, [Validators.required]],
      sortOrder: [this.orderParams?.sortOrder, [Validators.required]],
      pageSize: [this.orderParams?.pageSize, [Validators.required]],
    });

    this.componentSubscriptions.add(
      this.subService.getBookChanges().subscribe((books) => {
        console.log('bookList bookchanges subscribed');

        this.pagination = this.orderService.pagination;
        this.getPagedData();
      })
    );
  }

  loadOrders() {
    if (this.orderParams) {
      this.orderService.setOrderParams(this.orderParams);
      this.orderService.getOrders(this.orderParams).subscribe({
        next: (response) => {
          if (response.result && response.pagination) {
            this.orderService.setOrders(response.result);
            this.pagination = response.pagination;
            this.getPagedData();
          }
        },
      });
    }
  }

  //To mark All form controls as Touched to display Validation messages on-submit button clicked
  markAllAsTouched() {
    this.ngZone.runOutsideAngular(() => {
      Object.values(this.sortForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    });
  }
  onSubmit(event: Event) {
    if (this.sortForm.valid) {
      let value = this.sortForm.value;
      const bP = new BookParams(
        value.sortBy,
        value.sortOrder,
        value.pageNumber,
        value.pageSize
      );
      this.orderService.setOrderParams(bP);
      this.orderParams = this.orderService.getOrderParams();
      this.loadOrders();
      !!this.pagination ? this.pagination.currentPage = Constants.pageNumber : '';
    } else {
      event.stopPropagation();
      this.markAllAsTouched();
    }
  }

  //Navigates to OrderDetails onClick Order
  onOrder(id: number) {
    this.router.navigate([id], { relativeTo: this.route });
  }

  //Navigates to ItemDetail onClick of particular Item in Order
  onItem(event: Event, orderEl: Order, orderItem: OrderItem) {
    event.stopPropagation();
    this.router.navigate(['order', orderEl.id, orderItem.orderBook?.isbn]);
  }

  resetFilters() {
    this.orderParams = new OrderParams();
    this.ngOnInit();
  }

  pageChanged(event: any) {
    if (this.orderParams && this.orderParams?.pageNumber !== event.page) {
      this.orderParams.pageNumber = event.page;
      this.orderService.setOrderParams(this.orderParams);
      this.pagination ? (this.pagination.currentPage = event.page) : '';
      this.getPagedData();
    }
  }

  getPagedData() {
    if (this.pagination) {
      const startIndex =
        (this.pagination.currentPage - 1) * this.pagination.itemsPerPage;
      const endIndex = startIndex + this.pagination.itemsPerPage;
      this.orders = this.orderService.orders.slice(startIndex, endIndex);
    }
  }
  
  onHome(){
    this.router.navigate(['/book']);
  }
  ngOnDestroy(): void {
    this.componentSubscriptions.unsubscribe();
  }
}
