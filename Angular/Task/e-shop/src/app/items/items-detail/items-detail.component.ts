import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../items.service';
import { Item } from '../item.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserService } from 'src/app/users/user.service';
import { User } from 'src/app/auth/user.model';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-items-detail',
  templateUrl: './items-detail.component.html',
  styleUrls: ['./items-detail.component.css']
})
export class ItemsDetailComponent implements OnInit {

  item: Item;
  index: number;
  role: string = 'buyer';
  userId: string;
  
  constructor(private itemService: ItemsService,
    private userService: UserService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {

        
    this.userService.loggedUserChanged.subscribe(
      (user: User) => {
        if (!!this.userService.loggedUser && this.router.url.includes('shop')) { 
       
        this.role = user.role;
        console.log('this.role', this.role);
        }
      });


    this.route.params.subscribe(
      (params: Params) => {
        this.index = +params['id'];
        this.item = this.itemService.getItem(this.index);
      });

    this.itemService.itemChanged.subscribe(
      (items: Item[]) => {
        this.index = +(this.route.snapshot.params['id']);
        this.item = this.itemService.getItem(this.index);
      });

  }

  onEditItem(index: number) {
    console.log('Edit clicked' + index);
    this.router.navigate([index, 'edit'], { relativeTo: this.route.parent });
    // this.router.navigate([index]);
  }

  onDeleteItem(index) {
    console.log('Delete clicked' + index);
    this.itemService.deleteItem(index);
  }

  onAddToCart(event: Event, index: number) {
    event.stopPropagation();
    console.log('AddToCart clicked' + index);
    // this.itemService.AddToCart(index);
    this.cartService.AddToCart(index);
    this.router.navigate(['items']);
  }

}
