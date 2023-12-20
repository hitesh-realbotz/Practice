import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../items.service';
import { Item } from '../item.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserService } from 'src/app/users/user.service';
import { User } from 'src/app/auth/user.model';
import { CartService } from '../cart/cart.service';
import { OrderService } from 'src/app/orders/orders.service';
import { OrderItem } from 'src/app/orders/order-item.model';
import { ToastrService } from 'ngx-toastr';

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
    private router: Router,
    private toastr: ToastrService) { }

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
    if ( !!this.itemService.items && this.index != null) {
      if (!!this.userService.loggedUser && this.router.url.includes('orders')) {
        const itemId = +(this.route.snapshot.params['id2']);
        
        this.optionId = this.itemService.getItemIndexById(itemId);
        const orderedItem = this.orderService.getOrderById(this.index).orderedItems.find(item => item.itemId === itemId);
        
        if (this.optionId != -1 && this.isEqualToItem(orderedItem, itemId)) {
         

        } else {
          this.isAvailable = 'no';
          this.item = orderedItem;
          // console.log(this.orderService.getOrderById(this.index).orderedItems.find(item => item.itemId === itemId));
          // this.item = this.orderService.getOrderById(this.index).orderedItems.find(item => item.itemId === itemId);
          
        }
        
      } else {
          this.item = this.itemService.getItem(this.index); 
        }  
    }
  }

  isEqualToItem(orderedItem, itemId){
    this.item = this.itemService.getItemById(itemId);
    console.log(this.item);
    return orderedItem.name == this.item.name && 
    orderedItem.description == this.item.description && 
    orderedItem.image == this.item.image && 
    orderedItem.category == this.item.category;
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
    if (!!this.userService.loggedUser) {
      // this.itemService.AddToCart(index);
      this.cartService.AddToCart(index);
      this.router.navigate(['items']);
    }else{
      this.router.navigate(['/auth']);
      this.toastr.warning('Login to Place Order');
    }
    
  }

}
