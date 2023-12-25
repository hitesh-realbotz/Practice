import { Component, NgZone, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/auth/user.model';
import { UserService } from 'src/app/users/user.service';
import { Shop } from '../shop.model';

@Component({
  selector: 'app-shop-edit',
  templateUrl: './shop-edit.component.html',
  styleUrls: ['./shop-edit.component.css']
})
export class ShopEditComponent implements OnInit {

  loggedUserIndex: number;
  editMode = false;
  shopForm: FormGroup;
  curUser: User;
  constructor(private userService: UserService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone,) { }

  //BlanlForm inCase of Shop registration or Populates Form with ShopDetails in-case of EditShop
  ngOnInit() {
    console.log('Shop Edit Init called');
    this.curUser = this.userService.loggedUser;
    this.editMode = !!this.curUser.shop;
    this.loggedUserIndex = this.userService.getUserIndex(this.curUser.id);

    let shopName = '';
    let shopAddress = '';
    let shopIntro = '';
    let shopImage = '';

    if (this.editMode) {
      shopName = this.curUser.shop.shopName;
      shopAddress = this.curUser.shop.shopAddress;
      shopIntro = this.curUser.shop.shopIntro;
      shopImage = this.curUser.shop.shopImage;
    }

    this.shopForm = new FormGroup({
      'shopName': new FormControl(shopName, [Validators.required, this.checkWhiteSpace.bind(this)]),
      'shopAddress': new FormControl(shopAddress, [Validators.required, this.checkWhiteSpace.bind(this)]),
      'shopIntro': new FormControl(shopIntro, [Validators.required, this.checkWhiteSpace.bind(this)]),
      'shopImage': new FormControl(shopImage, [Validators.required, this.checkWhiteSpace.bind(this)]),
    });
  }

  checkWhiteSpace(control: FormControl): { [s: string]: boolean } {
    if (control.value.trim() === '') {
      return { 'checkWhiteSpace': true };
    }
    return null;
  }

  //To mark All form controls as Touched to display Validation messages on-submit button clicked
  markAllAsTouched() {
    this.ngZone.runOutsideAngular(() => {
      Object.values(this.shopForm.controls).forEach(control => {
        control.markAsTouched();
      });
    });
  }

  //Registers as Seller & Updates ShopDetails or Updates Existing ShopDetails on-submit
  onSubmit(event: Event) {

    if (this.shopForm.valid) {
      const newShop = new Shop(
        this.shopForm.value['shopName'],
        this.shopForm.value['shopAddress'],
        this.shopForm.value['shopIntro'],
        this.shopForm.value['shopImage'],
      );
      this.curUser.shop = newShop;
      if (this.editMode) {
        this.userService.updateUser(this.curUser, this.loggedUserIndex);
        this.toastr.info('Shop Updated!!');
      }
      else {
        this.curUser.role = 'seller';
        this.userService.updateUser(this.curUser, this.loggedUserIndex);
        this.router.navigate(['shop']);
        this.toastr.success('Shop Added!!');
      }
      this.onCancel();
    }
    else {
      event.stopPropagation();
      this.markAllAsTouched();
    }
    
  }

  //Exit from Form
  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

}


