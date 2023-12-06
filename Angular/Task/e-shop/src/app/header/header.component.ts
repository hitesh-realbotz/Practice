import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../users/user.service';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { Router } from '@angular/router';
import { Item } from '../items/item.model';
import { ItemsService } from '../items/items.service';
import { DataStorageService } from '../shared/data-storage.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuthenticated = false;
  role = '';
  private userSub: Subscription;
  constructor(private userService: UserService, 
              private authService: AuthService, 
              private router: Router, 
              private itemService: ItemsService, 
              private dataStorageService: DataStorageService,
              private toastr: ToastrService,) { }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  ngOnInit() {
    this.userSub = this.userService.loggedUserChanged.subscribe(
      (loggedUser: User) => {
        this.isAuthenticated = !!loggedUser;
        if (!!loggedUser) {
          this.role = loggedUser.role;
        }
      }
    )
  }

  onLogout() {
    this.authService.logout();
  }

  onProfile() {
    // this.router.navigate(['profile'], { relativeTo: this.route });
    this.router.navigate(['/user/profile']);
  }

  onGetItems() {
    const items: Item[] = [
      new Item(
        'Item-1',
        'https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'Formal white shirt',
        'Mens',
        1,
        'Gf6FvwzgvHNqBH5H5DN7AQKAo5h2'
      ),
      new Item(
        'Item-2',
        'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2hpcnR8ZW58MHx8MHx8fDA%3D',
        'Black t-shirt',
        'Womens',
        2,
        'Gf6FvwzgvHNqBH5H5DN7AQKAo5h2'
      ),
      new Item(
        'Item-3',
        'https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNoaXJ0fGVufDB8fDB8fHww',
        'Casual checks shirt',
        'Mens',
        3,
        'IBXZ35r0tlN5J89E4tWoiTrIzHz2'
      ),
      new Item(
        'Item-4',
        'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNsb3RoZXN8ZW58MHx8MHx8fDA%3D',
        'White t-shirt',
        'Womens',
        4,
        'IBXZ35r0tlN5J89E4tWoiTrIzHz2'
      )
    ];

    this.itemService.setItems(items);

    this.dataStorageService.storeItems();
    this.toastr.info('New Items Added', 'Add Action');

  }
}

