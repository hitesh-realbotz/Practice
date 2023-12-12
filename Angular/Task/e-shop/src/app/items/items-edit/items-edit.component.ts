import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ItemsService } from '../items.service';
import { Item } from '../item.model';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/users/user.service';
import { User } from 'src/app/auth/user.model';

@Component({
  selector: 'app-items-edit',
  templateUrl: './items-edit.component.html',
  styleUrls: ['./items-edit.component.css']
})
export class ItemsEditComponent implements OnInit {

  id: number;
  editMode = false;
  item: Item;
  itemForm: FormGroup;
  category: string;
  subscription: Subscription;
  
  constructor(private route: ActivatedRoute,
    private itemService: ItemsService,
    private router: Router,
    private location: Location,
    private userService: UserService) { }

  ngOnInit() {

    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        // this.item = new Item('', '', '', '');
      });

    this.itemService.itemChanged.subscribe(
      (items: Item[]) => {
        this.id = +(this.route.snapshot.params['id']);
        this.editMode = this.id != null;
        if (!!this.userService.loggedUser) {
          this.itemService.getItemsBySellerId(this.userService.loggedUser.id);
          this.id = this.itemService.sellerItemsIndex[this.id];
          this.item = this.itemService.getItem(this.id);
        }
        console.log('init form from itemChanged');
        this.initForm();
      });

    this.userService.loggedUserChanged.subscribe(
      (user: User) => {
        if (!!this.userService.loggedUser) {
          console.log('loggedUserChanged subscribed');
          this.itemService.getItemsBySellerId(this.userService.loggedUser.id);
          this.id = this.itemService.sellerItemsIndex[this.id];
          this.item = this.itemService.getItem(this.id);
          console.log('init form from loggedUserChanged');
          this.initForm();
        }

      });
    console.log('init form from outer main');
    this.initForm();
  }

  private initForm() {
    console.log("Init Form called");
    let name = '';
    let itemId = 0;
    let sellerId = '';
    let image = '';
    let description = '';
    let category = '';
    let amount = 0;
    let qty = 0;

    if (this.editMode && !!this.item) {

      name = this.item.name;
      itemId = this.item.itemId
      sellerId = this.item.sellerId;
      image = this.item.image;
      description = this.item.description;
      category = this.item.category;
      this.category = this.item.category;
      amount = this.item.price;
      qty = this.item.qty;
    }

    this.itemForm = new FormGroup({
      'name': new FormControl(name, Validators.required),
      'image': new FormControl(image, Validators.required),
      'description': new FormControl(description, Validators.required),
      'category': new FormControl(category, Validators.required),
      'amount': new FormControl(amount, Validators.required),
      'qty': new FormControl(qty, Validators.required),
      // 'itemId': new FormControl(itemId, Validators.required),
      // 'sellerId': new FormControl(sellerId, Validators.required),

    });
  }

  onSubmit() {
    const newItem = new Item(
      this.itemForm.value['name'],
      this.itemForm.value['image'],
      this.itemForm.value['description'],
      this.itemForm.value['category'],
      this.itemForm.value['amount'],
      this.itemForm.value['qty'],
    );
    if (this.editMode) {
      newItem.itemId = this.item.itemId;
      newItem.sellerId = this.item.sellerId;
      this.itemService.updateItem(this.id, newItem);
    }
    else {
      this.itemService.addItem(newItem);
    }
    this.onCancel();
  }


  onCancel() {
    // this.router.navigate(['../'], { relativeTo: this.route });
    this.location.back();
  }

}


