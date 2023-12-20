import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../../item.model';
import { UserService } from 'src/app/users/user.service';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { ItemsService } from '../../items.service';
import { User } from 'src/app/auth/user.model';
import { CartService } from '../../cart/cart.service';

@Component({
  selector: 'app-items-item',
  templateUrl: './items-item.component.html',
  styleUrls: ['./items-item.component.css']
})
export class ItemsItemComponent implements OnInit {

  @Input('item') item: Item;
  @Input() index: number;

  role: string = '';

  constructor(private userService: UserService,
              private itemService: ItemsService,
              private cartService: CartService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    if(this.router.url.includes('shop')){
      this.userService.loggedUserChanged.subscribe(
        (user: User) => {
          if (!!this.userService.loggedUser) {
            this.role = this.userService.loggedUser.role;
          }
        });
      }else{
        if (!!this.userService.loggedUser) {
          this.role = 'buyer';
        }
      }
  }

  
  // onEditItem(event: Event, index: number) {
  onEditItem(event: Event, item: Item) {
    event.stopPropagation();
    const index = this.itemService.getItemIndexById(item.itemId);
    console.log('Edit clicked'+index);
    this.router.navigate([index, 'edit'], { relativeTo: this.route.parent });
  }

  // onDeleteItem(event: Event, index){
  onDeleteItem(event: Event, item: Item){
    event.stopPropagation();
    const index = this.itemService.getItemIndexById(item.itemId);
    console.log('Delete clicked'+index);
    this.itemService.deleteItem(index);
  }

  // onAddToCart(event: Event,index: number){
  onAddToCart(event: Event,item: Item){
    event.stopPropagation();
    const index = this.itemService.getItemIndexById(item.itemId);
    console.log('AddToCart clicked'+ index);
    // this.itemService.AddToCart(index,null,null);
    this.cartService.AddToCart(index,null,null);
    this.router.navigate(['items']);
  }
  
  onItem(item: Item){
    let index = this.itemService.getItemIndexById(item.itemId);
    // if (this.router.url.includes('shop')) {
    //   index = this.itemService.sellerItemsIndex[index];
    // }
    this.router.navigate([index], { relativeTo: this.route.parent })
  }
}
