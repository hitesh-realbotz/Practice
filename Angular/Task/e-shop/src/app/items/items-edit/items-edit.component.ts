import { Component, NgZone, OnInit } from '@angular/core';
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
    private userService: UserService,
    private ngZone: NgZone) { }

  ngOnInit() {
    // this.initForm();
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
      });

    this.itemService.itemChanged.subscribe(
      (items: Item[]) => {
        this.initForm();
      });

    this.userService.loggedUserChanged.subscribe(
      (user: User) => {
        this.initForm();
      });

  }

  private initForm() {
    console.log("Init Form called");

    if (!!this.itemService.items) {
      this.id = +(this.route.snapshot.params['id']);
      // this.editMode = this.id != null;
      this.editMode = !this.router.url.includes('new');
      this.item = this.itemService.getItem(this.id);
    }

    let name = '';
    let itemId = 0;
    let sellerId = '';
    let image = '';
    let description = '';
    let category = '';
    let amount = 1;
    let qty = 1;
    let availableQty = 1;

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
      availableQty = this.item.availableQty;
    }

    this.itemForm = new FormGroup({
      'name': new FormControl(name, [Validators.required, this.checkWhiteSpace.bind(this)]),
      'image': new FormControl(image, [Validators.required, this.checkWhiteSpace.bind(this)]),
      'description': new FormControl(description, [Validators.required, this.checkWhiteSpace.bind(this)]),
      'category': new FormControl(category, Validators.required),
      'amount': new FormControl(amount, [Validators.required, Validators.pattern('^[1-9][0-9]*$'), this.checkPositiveAmount.bind(this)]),
      'qty': new FormControl(qty, [Validators.required, Validators.pattern('^[1-9][0-9]*$'), this.checkPositiveQty.bind(this)]),
      'availableQty': new FormControl(availableQty, Validators.required),
    });

    this.itemForm.get('qty').valueChanges.subscribe((value) => {
      if (!this.editMode) {
        this.itemForm.patchValue({ availableQty: this.itemForm.get('qty').value });
      }
    });
  }

  checkWhiteSpace(control: FormControl): { [s: string]: boolean } {
    if (control.value.trim() === '') {
      return { 'checkWhiteSpace': true };
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

  checkPositiveQty(control: FormControl): { [s: string]: boolean } | null {
    if (control.value <= 0) {
      return { 'invalidQty': true };
    }
    return null;
  }

  formValidate() {
    // const isValid = [];
    // console.log("itemForm.get('name').hasError('required')", this.itemForm.get('name').hasError('required'));
    // ( this.itemForm.get('name').hasError('required') || this.itemForm.get('name').hasError('checkWhiteSpace') ) ? isValid.push(false) : '';
    // ( this.itemForm.get('image').hasError('required') || this.itemForm.get('image').hasError('checkWhiteSpace') ) ? isValid.push(false) : '';
    // return isValid.includes(false);
    let isValid = false;
    (this.itemForm.get('name').hasError('required')
      || this.itemForm.get('name').hasError('checkWhiteSpace')
      || this.itemForm.get('image').hasError('required')
      || this.itemForm.get('image').hasError('checkWhiteSpace')
      || this.itemForm.get('description').hasError('required')
      || this.itemForm.get('description').hasError('checkWhiteSpace')
      || this.itemForm.get('category').hasError('required')
      || this.itemForm.get('amount').hasError('required')
      || this.itemForm.get('amount').hasError('invalidAmount')
      || this.itemForm.get('qty').hasError('required')
      || this.itemForm.get('qty').hasError('invalidQty')
    ) ? isValid = false
      : isValid = true;

    return isValid;
  }


  markAllAsTouched() {
    this.ngZone.runOutsideAngular(() => {
      Object.values(this.itemForm.controls).forEach(control => {
        control.markAsTouched();
      });
    });
  }

  onSubmit(event: Event) {
    if (this.formValidate()) {
      console.log("ValidForm");
      const newItem = new Item(
        this.itemForm.value['name'],
        this.itemForm.value['image'],
        this.itemForm.value['description'],
        this.itemForm.value['category'],
        this.itemForm.value['amount'],
        this.itemForm.value['qty'],
        null,
        null,
        this.itemForm.value['availableQty']
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

    } else {
      event.stopPropagation();
      this.markAllAsTouched();
    }
  }

  onCancel() {
    // this.router.navigate(['../'], { relativeTo: this.route });
    this.location.back();
  }

}


