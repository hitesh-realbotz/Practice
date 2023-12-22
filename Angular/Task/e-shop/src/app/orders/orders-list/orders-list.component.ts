import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Order } from '../order.model';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/users/user.service';
import { User } from 'src/app/auth/user.model';
import { OrderService } from '../orders.service';
import { Item } from 'src/app/items/item.model';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { FormControl, FormGroup } from '@angular/forms';


import { MatPaginatorIntl } from '@angular/material/paginator';
import { Injectable } from '@angular/core';
import { SubscriptionService } from 'src/app/shared/subscriptions.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class CustomPaginatorLabels extends MatPaginatorIntl {
  itemsPerPageLabel = 'Orders per page:';
}


@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})

export class OrdersListComponent implements OnInit, OnDestroy, AfterViewInit {

  orders: Order[] = [];
  componentSubscriptions = new Subscription();
  oredersPerPage = 2;
  pageIndex = 0;
  length = this.orders.length;
  pagedData: any[] = [];
  filteredData: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  selectedSortProperty: any = 'orderId'; // Default sort property
  selectedSortOrder: string = 'asc'; // Default sort order
  sortForm: FormGroup;

  constructor(
    private orderService: OrderService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef,
    private subService: SubscriptionService,
    private toastr: ToastrService) {
    this.sortForm = new FormGroup({
      selectedSortProperty: new FormControl('orderId'), // Default sort property
      selectedSortOrder: new FormControl('asc'), // Default sort order
    });
  }


  ngAfterViewInit() {
    // this.filterData(); 
    this.getPagedData();
    this.changeDetectorRef.detectChanges();


    if (this.orders.length > 0) {
      // this.filterData(); 
      this.getPagedData();
      this.changeDetectorRef.detectChanges();
    } else {
      setTimeout(() => {
        if (this.orderService.orderDetList.length < 1) {
          this.toastr.warning('Orders Not Available');
        }
      }, 1500);
    }

  }



  onPageChange(event: PageEvent) {
    console.log("onPageChange : ", event);
    this.pageIndex = event.pageIndex;
    this.oredersPerPage = event.pageSize;
    this.getPagedData();
  }

  getPagedData() {
    const startIndex = this.pageIndex * this.oredersPerPage;
    const endIndex = startIndex + this.oredersPerPage;
    this.pagedData = this.orders.slice(startIndex, endIndex);
  }

  onSortChange() {
    this.orders = this.sortItems([...this.orders]); // Create a new array to avoid mutating the original data
    this.ngAfterViewInit();
  }

  sortItems(data: any[]): any[] {
    console.log(this.sortForm.get('selectedSortProperty').value);
    console.log(this.sortForm.get('selectedSortOrder').value);
    return data.sort((a, b) => {
      const propertyA = a[this.sortForm.get('selectedSortProperty').value];
      const propertyB = b[this.sortForm.get('selectedSortProperty').value];
      const sortOrder = this.sortForm.get('selectedSortOrder').value === 'asc' ? 1 : -1;

      if (propertyA < propertyB) {
        return -1 * sortOrder;
      } else if (propertyA > propertyB) {
        return 1 * sortOrder;
      } else {
        return 0;
      }
    });
  }



  ngOnInit() {

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
    if (!!this.userService.loggedUser && !!this.orderService.orderDetList) {
      //Display only orders received for item with sellerId == User's Id
      if (this.router.url.includes('shop')) {
        this.orders = this.orderService.getOrdersBySellerId(this.userService.loggedUser.id);
      }
      //Display orders with buyerId == User's Id 
      else {
        this.orders = this.orderService.getOrdersByBuyerId(this.userService.loggedUser.id);
      }
      this.length = this.orders.length;
      this.getPagedData();
    }
  }

  //Navigates to OrderDetails onClick Order
  onOrder(index) {
    this.router.navigate([index], { relativeTo: this.route });
  }

  //Navigates to ItemDetail onClick of particular Item in Order
  onItem(event: Event, orderEl, orderItem) {
    event.stopPropagation();
    this.router.navigate(['items', 'orders', orderEl.orderId, orderItem.itemId]);
  }

  //Unsubscribe to all subscriptions
  ngOnDestroy() {
    this.componentSubscriptions.unsubscribe();
  }

}




