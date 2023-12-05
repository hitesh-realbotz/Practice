import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ItemsService } from '../items.service';
import { Item } from '../item.model';

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
  constructor(private route: ActivatedRoute,
    private itemService: ItemsService,
    private router: Router) { }

  ngOnInit() {
    console.log(this.editMode);
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        console.log(this.editMode);
      }
    );
    this.initForm();
  }

  private initForm() {
    this.item = this.itemService.getItem(this.id);

    let name = '';
    let itemId = 0 ;
    let sellerId = '';
    let image = '';
    let description = '';
    let category = '';

    if (this.editMode) {
      name = this.item.name;
      itemId = this.item.itemId
      sellerId = this.item.sellerId;
      image = this.item.image;
      description = this.item.description;
      category = this.item.category;
      this.category = this.item.category;
    }

    this.itemForm = new FormGroup({
      'name': new FormControl(name, Validators.required),
      'image': new FormControl(image, Validators.required),
      'description': new FormControl(description, Validators.required),
      'category': new FormControl(category, Validators.required),
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
    this.router.navigate(['../'], { relativeTo: this.route });
  }

}


