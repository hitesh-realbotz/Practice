import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { User } from 'src/app/auth/user.model';
import { CartService } from 'src/app/items/cart/cart.service';
import { CartItem } from 'src/app/items/cartItem.model';
import { Item } from 'src/app/items/item.model';
import { ItemsService } from 'src/app/items/items.service';
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

  constructor(private cartService: CartService, private userService: UserService, private itemService: ItemsService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,) { }

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
          console.log('selectedItems',  this.items);  
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
      'name': new FormControl('', Validators.required),
      'contactNo': new FormControl('', Validators.required),      
      'address': new FormControl('', Validators.required),
      'cardNo': new FormControl('', Validators.required),
      'cvv': new FormControl('', Validators.required),
      'pin': new FormControl('', Validators.required),
    });
  }

  onSubmit() {

  }

  onCancel() {

  }

}
