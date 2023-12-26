import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { Router } from '@angular/router';
import { Item } from '../items/item.model';
import { ItemsService } from '../items/items.service';
import { DataStorageService } from '../shared/data-storage.service';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from '../orders/orders.service';
import { SubscriptionService } from '../shared/subscriptions.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuthenticated = false;
  role = '';
  componentSubscriptions = new Subscription();

  constructor(
    private authService: AuthService,
    private router: Router,
    private itemService: ItemsService,
    private dataStorageService: DataStorageService,
    private toastr: ToastrService,
    private orderService: OrderService,
    private subService: SubscriptionService) { }

  ngOnDestroy() {
    this.componentSubscriptions.unsubscribe();
  }

  ngOnInit() {

    this.componentSubscriptions.add(
      this.subService.getLoggedUserChanges().subscribe(
        (user: User) => {
          this.isAuthenticated = !!user;
          if (!!user) {
            this.role = user.role;
          }
        })
    );
  }

  onLogout() {
    this.authService.logout();
  }

  //Displays User Profile
  onProfile() {
    // this.router.navigate(['profile'], { relativeTo: this.route });
    this.router.navigate(['/user/profile']);
  }

  //Deletes All Orders
  onRemoveOrders() {
    this.orderService.orderDetList = [];
    this.dataStorageService.storeOrders();
  }

  //Gets Dummy Items
  onGetItems() {
    const items: Item[] = [
      new Item(
        'Item-1',
        'https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'Formal white shirt',
        'Mens',
        1500,
        25,
        1,
        'cjsXRKLhOdZnwJUguMaIUFCl7qJ2'
      ),
      new Item(
        'Item-2',
        'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2hpcnR8ZW58MHx8MHx8fDA%3D',
        'Black t-shirt',
        'Womens',
        1400,
        5,
        2,
        'cjsXRKLhOdZnwJUguMaIUFCl7qJ2'
      ),
      new Item(
        'Item-3',
        'https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNoaXJ0fGVufDB8fDB8fHww',
        'Casual checks shirt',
        'Mens',
        2500,
        25,
        3,
        'B2ZZts5aUDgTuRDfKLCKX79Njc92'
      ),
      new Item(
        'Item-4',
        'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNsb3RoZXN8ZW58MHx8MHx8fDA%3D',
        'White t-shirt',
        'Womens',
        500,
        25,
        4,
        'B2ZZts5aUDgTuRDfKLCKX79Njc92'
      )
    ];

    this.itemService.setItems(items);
    this.dataStorageService.storeItems();
    this.toastr.info('New Items Added', 'Add Action');

  }
}

