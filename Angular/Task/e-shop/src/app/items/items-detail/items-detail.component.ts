import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../items.service';
import { Item } from '../item.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserService } from 'src/app/users/user.service';
import { User } from 'src/app/auth/user.model';
import { CartService } from '../cart/cart.service';
import { OrderService } from 'src/app/orders/orders.service';
import { OrderItem } from 'src/app/orders/order-item.model';

@Component({
  selector: 'app-items-detail',
  templateUrl: './items-detail.component.html',
  styleUrls: ['./items-detail.component.css']
})
export class ItemsDetailComponent implements OnInit {

  item;
  index: number;
  isAvailable: string = 'buyer';
  optionId: number;

  constructor(private itemService: ItemsService,
    private userService: UserService,
    private cartService: CartService,
    private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {

    if (this.router.url.includes('shop')) {
      this.isAvailable = 'shop';
    }


    this.route.params.subscribe(
      (params: Params) => {
        this.index = +params['id'];
      });

    this.userService.loggedUserChanged.subscribe(
      (user: User) => {
        this.initProcess();
      });

    this.itemService.itemChanged.subscribe(
      (Items: Item[]) => {
        this.initProcess();
      });
  }

  initProcess() {
    if (!!this.userService.loggedUser && !!this.itemService.items && this.index != null) {
      if (this.router.url.includes('orders')) {
        this.isAvailable = 'no';
        const itemId = +(this.route.snapshot.params['id2']);
        this.optionId = this.itemService.getItemIndexById(itemId);
        console.log('optionID : ', this.optionId);
        // this.item = this.itemService.getItemById(itemId); 
        console.log(this.orderService.getOrderById(this.index).orderedItems.find(item => item.itemId === itemId));
        this.item = this.orderService.getOrderById(this.index).orderedItems.find(item => item.itemId === itemId);
      } else {
          this.item = this.itemService.getItem(this.index); 
        }  
    }
  }



  onEditItem(index: number) {
    console.log('Edit clicked' + index);
    this.router.navigate([index, 'edit'], { relativeTo: this.route.parent });
    // this.router.navigate([index]);
  }
  onAvailableItem(index: number) {
    console.log('onAvailableItem clicked' + index);
    // this.router.navigate([index, 'edit'], { relativeTo: this.route.parent });
    // this.router.navigate([index]);
    this.router.navigate([ 'items', this.optionId]);
  }

  onDeleteItem(index) {
    console.log('Delete clicked' + index);
    this.itemService.deleteItem(index);
  }

  onAddToCart(event: Event, index: number) {
    event.stopPropagation();
    console.log('AddToCart clicked' + index);
    // this.itemService.AddToCart(index);
    this.cartService.AddToCart(index);
    this.router.navigate(['items']);
  }

}
