import { Location } from '@angular/common';
import { Component, NgZone, OnInit } from '@angular/core';
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
    private orderService: OrderService,
    private ngZone: NgZone) { }

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
      'buyerName': new FormControl('', [Validators.required, this.checkWhiteSpace.bind(this)]),
      'contactNo': new FormControl('', [Validators.required, this.checkContactNo.bind(this)]),
      'address': new FormControl('', [Validators.required, this.checkWhiteSpace.bind(this)]),
      'shippingMethod': new FormControl('standard', Validators.required),
      'cardNo': new FormControl('', [Validators.required,Validators.pattern('^[1-9][0-9]*$'), this.checkCardNo.bind(this), this.checkCardNoLength.bind(this) ]),
      'cvv': new FormControl('', [Validators.required, Validators.pattern('^[1-9][0-9]*$'), this.checkCVV.bind(this)]),
      'pin': new FormControl('', [Validators.required, this.checkPin.bind(this)]),
    });
  }

  checkWhiteSpace(control: FormControl): { [s: string]: boolean } {
    if (control.value.trim() === '') {
      return { 'checkWhiteSpace': true };
    }
    return null;
  }
  checkContactNo(control: FormControl): { [s: string]: boolean } {
    if (control.value.trim().length < 10 ) {
      return { 'checkContactNo': true };
    }
    return null;
  }
  checkCardNoLength(control: FormControl): { [s: string]: boolean } {
    if (control.value.trim().length != 16) {   
        return { 'checkCardNoLength': true };
    }
    return null;
}

checkCardNo(control: FormControl): { [s: string]: boolean } {
    if (control.value <= 0 ) {
        return { 'checkCardNo': true };
    }
    return null;
}
  checkCVV(control: FormControl): { [s: string]: boolean } {
    if ( control.value <= 0) {
      return { 'checkCVV': true };
    }
    return null;
  }
  checkPin(control: FormControl): { [s: string]: boolean } {
    if (control.value.trim().length != 6) {
      return { 'checkPin': true };
    }
    return null;
  }

  checkPositiveAmount(control: FormControl): { [s: string]: boolean } | null {
    if (control.value <= 0) {
      return { 'invalidAmount': true };
    }
    // this.itemForm.get('availableQty').patchValue(this.itemForm.get('qty'));
    return null;
  }

  markAllAsTouched() {
    this.ngZone.runOutsideAngular(() => {
      Object.values(this.paymentForm.controls).forEach(control => {
        control.markAsTouched();
      });
    });
  }

  onSubmit() {
    if (this.paymentForm.valid) {
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
    } else {
      event.stopPropagation();
      this.markAllAsTouched();
    }

    

  }

  onCancel() {
    this.location.back();
  }

}
