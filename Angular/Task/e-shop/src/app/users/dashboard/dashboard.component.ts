import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { ItemsService } from 'src/app/items/items.service';
import { User } from 'src/app/auth/user.model';
import { Item } from 'src/app/items/item.model';
import { OrderService } from 'src/app/orders/orders.service';
import { CartService } from 'src/app/items/cart/cart.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Order } from 'src/app/orders/order.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  role: string;
  subscription: any;
  sellerItemCount: number;
  orderCount: number;
  sellerOrderCount: number;
  cartItemCount: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private itemService: ItemsService,
    private orderService: OrderService,
    private cartService: CartService,
    private dataStorageService: DataStorageService) {

  }

  ngOnInit() {
    console.log("ItemList Called================>");

    this.userService.loggedUserChanged.subscribe(
      (user: User) => {
        this.initProcess();
      });

    this.subscription = this.itemService.itemChanged.subscribe(
      (items: Item[]) => {
        this.initProcess();
        // this.dataStorageService.storeItems();
      });
      this.orderService.ordersChanged.subscribe(
        (orders: Order[]) => {
          this.initProcess();
        }
      )
  }

  initProcess() {
    if (!!this.userService.loggedUser && !!this.itemService.items && !!this.orderService.orderDetList.length) {
      this.role = this.userService.loggedUser.role;

      this.cartItemCount = this.cartService.getItems().length;
      this.sellerItemCount = this.itemService.getItemsBySellerId(this.userService.loggedUser.id).length;
      this.orderCount = this.orderService.getOrdersByBuyerId(this.userService.loggedUser.id).length;
      this.sellerOrderCount = this.orderService.getOrdersBySellerId(this.userService.loggedUser.id).length;


    }
  }

  onMyOrders() {
    this.router.navigate(['/orders']);
  }
  onShopOrders() {
    this.router.navigate(['/shop/orders']);
  }
  onCart() {
    this.router.navigate(['cart'], { relativeTo: this.route });
  }

  onProfile() {
    // this.router.navigate(['profile'], { relativeTo: this.route });
    this.router.navigate(['/user/profile']);
  }
  
  onGetOrCreateShop() {
    if (this.role === 'buyer') {
      this.router.navigate(['shop/details']);
    } else {
      this.router.navigate(['shop']);
    }
  }
}
