
// import { Component, OnDestroy, OnInit } from '@angular/core';
// import { Router, ActivatedRoute } from '@angular/router';
// import { Subscription } from 'rxjs';
// import { Item } from '../item.model';
// import { ItemsService } from '../items.service';
// import { UserService } from 'src/app/users/user.service';
// import { User } from 'src/app/auth/user.model';
// import { DataStorageService } from 'src/app/shared/data-storage.service';

// @Component({
//   selector: 'app-items-list',
//   templateUrl: './items-list.component.html',
//   styleUrls: ['./items-list.component.css']
// })
// export class ItemsListComponent implements OnInit, OnDestroy {

//   items: Item[] = [];
//   subscription: Subscription;
//   role: string;

//   constructor(
//     private itemService: ItemsService,
//     private userService: UserService,
//     private dataStorageService: DataStorageService,
//     private router: Router,
//     private route: ActivatedRoute) { }



//   ngOnInit() {
//     console.log("ItemList Called================>");
//     this.userService.loggedUserChanged.subscribe(
//       (user: User) => {
//         this.initProcess();
//       });

//     this.subscription = this.itemService.itemChanged.subscribe(
//       (Items: Item[]) => {
//         this.initProcess();





//         this.dataStorageService.storeItems();
//       });
//   }

//   initProcess() {
//     if (!!this.userService.loggedUser && !!this.itemService.items) {

//       this.role = this.userService.loggedUser.role;
//       if (this.router.url.includes('shop')) {
//         this.items = this.itemService.getItemsBySellerId(this.userService.loggedUser.id);
//         console.log('this.itemService.sellerItemsIndex');
//         console.log(this.itemService.sellerItemsIndex);
//         console.log(this.itemService.items[this.itemService.sellerItemsIndex[0]]);
//         console.log(this.itemService.items[this.itemService.sellerItemsIndex[1]]);
//       } else {
//         this.items = this.itemService.getItems();
//       }
//     }
//   }

//   onNewItem() {
//     this.router.navigate(['new'], { relativeTo: this.route });
//   }
//   ngOnDestroy() {

//     if (!!this.subscription) {
//       this.subscription.unsubscribe();
//     }
//   }

// }

import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Item } from '../item.model';
import { ItemsService } from '../items.service';
import { UserService } from 'src/app/users/user.service';
import { User } from 'src/app/auth/user.model';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css'],

})
export class ItemsListComponent implements OnInit, AfterViewInit, OnDestroy {

  items: Item[] = [];
  subscription: Subscription;
  role: string;

  itemsPerPage = 2;
  pageIndex = 0;
  length = this.items.length;
  pagedData: any[] = [];
  filteredData: any[] = [];
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  selectedSortProperty: string = 'name'; // Default sort property
  selectedSortOrder: string = 'asc'; // Default sort order
  sortForm: FormGroup;

  constructor(
    private itemService: ItemsService,
    private userService: UserService,
    private dataStorageService: DataStorageService,
    private router: Router,
    private route: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef) { 
      this.sortForm = new FormGroup({
        selectedSortProperty: new FormControl('name'), // Default sort property
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
    this.itemsPerPage = event.pageSize;
    this.getPagedData();
  }


  onSortChange() {
    this.items = this.sortItems([...this.items]); // Create a new array to avoid mutating the original data
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

  getPagedData() {
    const startIndex = this.pageIndex * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pagedData = this.items.slice(startIndex, endIndex);
  }


  ngOnInit() {
    console.log("ItemList Called================>");
    
    this.userService.loggedUserChanged.subscribe(
      (user: User) => {
        this.initProcess();
      });

    this.subscription = this.itemService.itemChanged.subscribe(
      (Items: Item[]) => {
        this.initProcess();
        // this.dataStorageService.storeItems();
      });
  }

  initProcess() {
    if (!!this.userService.loggedUser && !!this.itemService.items) {
      this.role = this.userService.loggedUser.role;
      if (this.router.url.includes('shop')) {
        this.items = this.itemService.getItemsBySellerId(this.userService.loggedUser.id);
      } else {
        this.items = this.itemService.getItems();
      }
      this.length = this.items.length;
      this.getPagedData();
    }
  }

  onNewItem() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    if (!!this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
