import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Item } from '../../item.model';
import { UserService } from 'src/app/users/user.service';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { ItemsService } from '../../items.service';
import { User } from 'src/app/auth/user.model';
import { CartService } from '../../cart/cart.service';
import { Subscription } from 'rxjs';
import { SubscriptionService } from 'src/app/shared/subscriptions.service';

@Component({
  selector: 'app-items-item',
  templateUrl: './items-item.component.html',
  styleUrls: ['./items-item.component.css']
})
export class ItemsItemComponent implements OnInit, OnDestroy {

  @Input('item') item: Item;
  @Input() index: number;
  seller: User;
  

  role: string = '';
  componentSubscriptions = new Subscription();

  constructor(private userService: UserService,
    private itemService: ItemsService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router,
    private subService: SubscriptionService) { }

  ngOnInit() {

    if (this.router.url.includes('shop')) {
      //Subscribe to LoggedUserChanges
      this.componentSubscriptions.add(
        this.subService.getLoggedUserChanges().subscribe(
          (user: User) => {
            console.log('loggedChanged in Item');
            if (!!this.userService.loggedUser) {
              this.role = this.userService.loggedUser.role;
            }
          })
      );
    } else {
      if (!!this.userService.loggedUser) {
        this.role = 'buyer';
      }
    }
    this.getSellerInfo();
  }

  getSellerInfo(){
    this.seller = this.userService.getUserById(this.item.sellerId);
    console.log('Seller', this.seller);
  }


  //OnClick Edit Item
  onEditItem(event: Event, item: Item) {
    event.stopPropagation();
    const index = this.itemService.getItemIndexById(item.itemId);
    console.log('Edit clicked' + index);
    this.router.navigate([index, 'edit'], { relativeTo: this.route.parent });
  }

  //OnClick Delete Item
  onDeleteItem(event: Event, item: Item) {
    event.stopPropagation();
    const index = this.itemService.getItemIndexById(item.itemId);
    console.log('Delete clicked' + index);
    this.itemService.deleteItem(index);
  }

  //OnClick AddToCart Item
  onAddToCart(event: Event, item: Item) {
    event.stopPropagation();
    const index = this.itemService.getItemIndexById(item.itemId);
    console.log('AddToCart clicked' + index);
    // this.itemService.AddToCart(index,null,null);
    this.cartService.AddToCart(index, null, null);
    this.router.navigate(['items']);
  }


  //Navigate to ItemDetails OnClick of Item
  onItem(item: Item) {
    let index = this.itemService.getItemIndexById(item.itemId);
    this.router.navigate([index], { relativeTo: this.route.parent })
  }

  //Unsubscribe to all subscriptions
  ngOnDestroy() {
    this.componentSubscriptions.unsubscribe();
  }
}
