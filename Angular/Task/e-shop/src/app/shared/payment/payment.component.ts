import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from 'src/app/auth/user.model';
import { CartService } from 'src/app/items/cart/cart.service';
import { CartItem } from 'src/app/items/cart/cartItem.model';
import { Item } from 'src/app/items/item.model';
import { ItemsService } from 'src/app/items/items.service';
import { Order } from 'src/app/orders/order.model';
import { OrderService } from 'src/app/orders/orders.service';
import { UserService } from 'src/app/users/user.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  paymentForm: FormGroup;
  subscription: Subscription;
  items: CartItem[] = [];
  shippingMethods: string[] = ['standard', 'by-air'];

  constructor(private cartService: CartService, private userService: UserService, private itemService: ItemsService,
    private location: Location,
    private orderService: OrderService) { }

  ngOnInit() {
    this.initForm();
    this.userService.loggedUserChanged.subscribe(
      (user: User) => {
        this.cartService.getItems();
      }
    );
    this.itemService.itemChanged.subscribe(
      (items: Item[]) => {
        this.cartService.getItems();
      }
    );

    this.subscription = this.cartService.cartItemsChanged.subscribe(
      (items: CartItem[]) => {
        if (items != null) {
          for (const item of items) {
            if (item.checked) {
              this.items.push(item);
            }
          }
          this.initForm();
        }
      }
    );


  }

  private initForm() {

    console.log("Init Form called");
    let amount = this.items ? this.cartService.totalSelectedCartAmount : 0;
    console.log('amount', amount);
    this.paymentForm = new FormGroup({
      'amount': new FormControl(amount, Validators.required),
      'buyerName': new FormControl('', Validators.required),
      'contactNo': new FormControl('', Validators.required),
      'address': new FormControl('', Validators.required),
      'shippingMethod': new FormControl('standard', Validators.required),
      'cardNo': new FormControl('', Validators.required),
      'cvv': new FormControl('', Validators.required),
      'pin': new FormControl('', Validators.required),
    });
  }

  onSubmit() {

    if (this.paymentForm.value['pin'] === this.userService.loggedUser.password) {
      
      const newOrder = new Order(
                                  this.userService.loggedUser.id,
                                  this.paymentForm.value['buyerName'],
                                  this.paymentForm.value['contactNo'], 
                                  this.paymentForm.value['address'], 
                                  this.paymentForm.value['shippingMethod'], 
                                  this.paymentForm.value['amount']
                                );
      this.orderService.newOrder(newOrder, this.items);
      
    } else {
      this.onCancel();
    }

  }

  onCancel() {
    this.location.back();
  }

}
