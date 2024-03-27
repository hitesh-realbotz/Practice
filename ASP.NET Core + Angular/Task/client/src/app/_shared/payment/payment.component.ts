import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Cart } from 'src/app/_models/cart';
import { CartService } from 'src/app/_services/cart.service';
import { OrderService } from 'src/app/_services/order.service';
import { SubscriptionsService } from 'src/app/_services/subscriptions.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit , OnDestroy {
  ngOnDestroy(): void {
    this.componentSubscriptions.unsubscribe();
  }

  paymentForm: FormGroup = new FormGroup({});
  
  componentSubscriptions = new Subscription();
  cart: Cart | undefined;

  shippingMethods: string[] = ['standard', 'by-air'];

  constructor(private cartService: CartService,
    private location: Location,
    private orderService: OrderService,
    private ngZone: NgZone,
    private subService: SubscriptionsService, private router: Router) { }


  ngOnInit(): void {
    this.initForm();
    this.componentSubscriptions.add(this.subService.getCartChanges().subscribe({
      next: (cart) => {
        this.cartService.getCart();
    }
    }))
  }

  private initForm() {

    console.log("Init Form called");
    let totalPrice = this.cart ? this.cart.totalCheckedPrice : 0;
    console.log('amount', totalPrice);
    this.paymentForm = new FormGroup({
      'totalPrice': new FormControl(totalPrice, Validators.required),
      'billingName': new FormControl('', [Validators.required, this.checkWhiteSpace.bind(this)]),
      'contactNo': new FormControl('', [Validators.required, this.checkContactNo.bind(this)]),
      'address': new FormControl('', [Validators.required, this.checkWhiteSpace.bind(this)]),
      'shippingMethod': new FormControl('standard', Validators.required),
      'cardNo': new FormControl('', [Validators.required,Validators.pattern('^[1-9][0-9]*$'), this.checkCardNo.bind(this), this.checkCardNoLength.bind(this) ]),
      'cvv': new FormControl('', [Validators.required, Validators.pattern('^[1-9][0-9]*$'), this.checkCVV.bind(this)]),
      'pin': new FormControl('', [Validators.required, this.checkPin.bind(this)]),
    });
  }

  checkWhiteSpace(control: FormControl): { [s: string]: boolean } | null {
    if (control.value.trim() === '') {
      return { 'checkWhiteSpace': true };
    }
    return null;
  }
  checkContactNo(control: FormControl): { [s: string]: boolean } | null {
    if (control.value.trim().length < 10 ) {
      return { 'checkContactNo': true };
    }
    return null;
  }
  checkCardNoLength(control: FormControl): { [s: string]: boolean } | null {
    if (control.value.trim().length != 16) {   
        return { 'checkCardNoLength': true };
    }
    return null;
}

checkCardNo(control: FormControl): { [s: string]: boolean } | null {
    if (control.value <= 0 ) {
        return { 'checkCardNo': true };
    }
    return null;
}
  checkCVV(control: FormControl): { [s: string]: boolean } | null {
    if ( control.value <= 0) {
      return { 'checkCVV': true };
    }
    return null;
  }
  checkPin(control: FormControl): { [s: string]: boolean } | null {
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

  onSubmit(event: Event) {
    if (this.paymentForm.valid && !!this.cart) {
      // if (this.paymentForm.value['pin'] === this.userService.loggedUser.password) {
      
      //   const newOrder = new Order(
      //                               this.userService.loggedUser.id,
      //                               this.paymentForm.value['buyerName'],
      //                               this.paymentForm.value['contactNo'], 
      //                               this.paymentForm.value['address'], 
      //                               this.paymentForm.value['shippingMethod'], 
      //                               this.paymentForm.value['amount']
      //                             );
      //   this.orderService.newOrder(newOrder, this.items);
        
      // } else {
      //   this.onCancel();
      // }

      this.orderService.placeOrder(this.cart).subscribe({
        next: order => {
          this.router.navigate(['/order/'+order.id]);
        }
      })

    } else {
      event.stopPropagation();
      this.markAllAsTouched();
    } 

  }

  
  onCancel() {
    this.location.back();
  }

}
