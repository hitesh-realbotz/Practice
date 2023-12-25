import { Component, OnInit } from '@angular/core';
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
    private router: Router) { }

  //BlanlForm inCase of Shop registration or Populates Form with ShopDetails in-case of EditShop
  ngOnInit() {
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
      'shopName': new FormControl(shopName, Validators.required),
      'shopAddress': new FormControl(shopAddress, Validators.required),
      'shopIntro': new FormControl(shopIntro, Validators.required),
      'shopImage': new FormControl(shopImage, Validators.required),
    });
  }

  //Registers as Seller & Updates ShopDetails or Updates Existing ShopDetails on-submit
  onSubmit() {
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
      this.toastr.success('Shop Added!!');
    }
    this.onCancel();
  }

  //Exit from Form
  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

}


