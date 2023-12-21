import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
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

@Injectable()
export class CustomPaginatorLabels extends MatPaginatorIntl {
  itemsPerPageLabel = 'Orders per page:';
}


@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})

export class OrdersListComponent implements OnInit, AfterViewInit {

  orders: Order[] = [];
  subscription: Subscription;
  showActions: boolean = false;
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
    private changeDetectorRef: ChangeDetectorRef) { 
      this.sortForm = new FormGroup({
        selectedSortProperty: new FormControl('orderId'), // Default sort property
        selectedSortOrder: new FormControl('asc'), // Default sort order
      });
    }


    ngAfterViewInit(){
      // this.filterData(); 
      this.getPagedData();
      this.changeDetectorRef.detectChanges();
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
      console.log('from list Init main before', this.orderService.orderDetList);
      if (this.router.url.includes('shop')) {
        this.orders = this.orderService.getOrdersBySellerId(this.userService.loggedUser.id);
      } else {
        this.orders = this.orderService.getOrdersByBuyerId(this.userService.loggedUser.id);
      }
      this.length = this.orders.length;
      this.getPagedData();
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




