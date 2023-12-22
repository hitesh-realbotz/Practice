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
import { SubscriptionService } from 'src/app/shared/subscriptions.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css'],

})
export class ItemsListComponent implements OnInit, AfterViewInit, OnDestroy {

  items: Item[] = [];
  componentSubscriptions = new Subscription();
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
    private changeDetectorRef: ChangeDetectorRef,
    private subService: SubscriptionService,
    private toastr: ToastrService,) {
    this.sortForm = new FormGroup({
      selectedSortProperty: new FormControl('name'), // Default sort property
      selectedSortOrder: new FormControl('asc'), // Default sort order
    });
  }

  ngAfterViewInit() {
    if (this.items.length > 0) {
      // this.filterData(); 
      this.getPagedData();
      this.changeDetectorRef.detectChanges();
    } else {
      setTimeout(() => {
        if (this.itemService.items.length < 1) {
          this.toastr.warning('Items Not Available');
        }
      }, 1500);
    }
  }

  //OnChange of no. of pages per page
  onPageChange(event: PageEvent) {
    console.log("onPageChange : ", event);
    this.pageIndex = event.pageIndex;
    this.itemsPerPage = event.pageSize;
    this.getPagedData();
  }

  //OnChange of Sorting Property or Order
  onSortChange() {
    this.items = this.sortItems([...this.items]); // Create a new array to avoid mutating the original data
    this.ngAfterViewInit();
  }
  //Sorts Items
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

  //OnChange of Page
  getPagedData() {
    const startIndex = this.pageIndex * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pagedData = this.items.slice(startIndex, endIndex);
  }


  ngOnInit() {

    //Subscribe to LoggedUserChanges
    this.componentSubscriptions.add(
      this.subService.getLoggedUserChanges().subscribe(
        (user: User) => {
          console.log('loggedChanged in ItemList');
          this.initProcess();
        })
    );

    //Subscribe to ItemsChanges
    this.componentSubscriptions.add(
      this.subService.getItemChanges().subscribe(
        (items: Item[]) => {
          this.items = this.itemService.getItems();
          this.initProcess();
        })
    );

  }

  initProcess() {
    if (!!this.itemService.items) {
      if (!!this.userService.loggedUser && this.router.url.includes('shop')) {
        this.role = this.userService.loggedUser.role;
        this.items = this.itemService.getItemsBySellerId(this.userService.loggedUser.id);
      } else {
        this.items = this.itemService.getItems();
      }
      this.length = this.items.length;
      this.getPagedData();
    }
  }

  //Navigates to BlankForm for New Item addition
  onNewItem() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  //Unsubscribe to all subscriptions
  ngOnDestroy() {
    // if (!!this.subscription) {
    //   this.subscription.unsubscribe();
    // }
    this.componentSubscriptions.unsubscribe();
  }

}
