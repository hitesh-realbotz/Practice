import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../users/user.service';
import { User } from '../auth/user.model';
import { Subscription } from 'rxjs';
import { SubscriptionService } from '../shared/subscriptions.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit, OnDestroy {

  isShop: boolean = false;
  componentSubscriptions = new Subscription();

  constructor(private router: Router,
              private route: ActivatedRoute,
              private userService: UserService,
              private subService: SubscriptionService) { }

  ngOnInit() {

    //Subscribe to LoggedUserChanges
    this.componentSubscriptions.add(
      this.subService.getLoggedUserChanges().subscribe((user: User) => {
        if (!!user) {
          this.isShop = !!user.shop;
          console.log('isShop : ' + !!this.userService.loggedUser.shop);
        }
      })
    );
  }


  // onNewItem() {
  //   this.router.navigate(['new'], { relativeTo: this.route });
  // }

  //Navigates to ShopOrders received fro items with SellerId == userId
  onShopOrders() {
    this.router.navigate(['/shop/orders']);
  }

  //Navigate to ShopDetails
  onShopDetails() {
    this.router.navigate(['details'], { relativeTo: this.route });
  }

  //Unsubscribe to all subscriptions
  ngOnDestroy() {
    this.componentSubscriptions.unsubscribe();
  }
}
