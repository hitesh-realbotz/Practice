import { Component, OnInit } from '@angular/core';
import { Item } from '../item.model';
import { Subscription } from 'rxjs';
import { ItemsService } from '../items.service';
import { UserService } from 'src/app/users/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from '../cartItem.model';
import { User } from 'src/app/auth/user.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items: CartItem[];
  totalCartAmount: number;
  totalSelectedCartAmount: number;
  subscription: Subscription;


  constructor(private itemService: ItemsService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,) { }

  initForm() {
    if (!!this.userService.loggedUser && !!this.itemService.items) {
      const usersDetList = JSON.parse(localStorage.getItem('usersDetailList'));
      const userIndex = this.userService.loggedUserIndex;
      let localUserCart: { id: number, qty: number }[] = [];
      console.log('userIndex : ', userIndex);
      console.log('usersDetList : ', usersDetList);
      if (usersDetList && usersDetList[userIndex] && usersDetList[userIndex].cart) {
        localUserCart = usersDetList[userIndex].cart;
        console.log('localStorageCart : ', localUserCart);
      }
      this.items = this.itemService.getItemsById(localUserCart);
      this.calculateTotalAmount();
    }

  }

  ngOnInit() {

    this.userService.loggedUserChanged.subscribe(
      (user: User) => {
        console.log('loggedUserChanged.subscribe');
        this.initForm();
      }
    );
    this.itemService.itemChanged.subscribe(
      (items: Item[]) => {
        console.log('itemChanged.subscribe');
        this.initForm();
      }
    );

    this.subscription = this.itemService.cartItemsChanged.subscribe(
      (items: CartItem[]) => {
        console.log('cartItemsChanged.subscribe');
        this.items = items;
        this.calculateTotalAmount();
      }
    );
  }

  onClearCart() {
    const userIndex = this.userService.loggedUserIndex;
    this.items = [];
    const usersDetList = JSON.parse(localStorage.getItem('usersDetailList'));
    usersDetList[userIndex].cart = [];
    localStorage.setItem('usersDetailList', JSON.stringify(usersDetList));
    this.itemService.cartItems = [];
    this.totalCartAmount = 0;
    this.totalSelectedCartAmount = 0;
    this.toastr.warning('Items removed from cart!!');
  }

  decreaseQuantity(index : number,itemEl: CartItem) {
    console.log('index : ', index);
    console.log('itemEl : ', itemEl);
    this.itemService.AddToCart(null, itemEl, true);
  }
  increaseQuantity(itemEl: CartItem) {
    console.log('itemEl : ', itemEl);
    this.itemService.AddToCart(null, itemEl, null);
  }

  toggleItemCheck(index: number) {
    console.log('this.itemService.cartItems[index].checked : ', this.itemService.cartItems[index].checked);
    this.itemService.cartItems[index].checked = !this.itemService.cartItems[index].checked;
    this.itemService.cartItemsChanged.next(this.itemService.cartItems);  
  }
  calculateTotalAmount(){
    this.totalCartAmount = this.itemService.cartItems.reduce((total, item) => total + item.item.price, 0);
    this.totalSelectedCartAmount = this.itemService.cartItems.reduce((total, item) => total + (item.checked ? (item.item.price) : 0), 0);

  }

  onCheckout(){

  }

}
