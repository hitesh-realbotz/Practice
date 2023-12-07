import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../items.service';
import { Item } from '../item.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserService } from 'src/app/users/user.service';
import { User } from 'src/app/auth/user.model';

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
  user: User;
  constructor(private itemService: ItemsService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {

    this.userService.usersChanged.subscribe(
      (users: User[]) => {
        console.log("loggedUserSubscribe called");
        this.role = this.userService.loggedUser.role;

      }
    );

    const userIndex = JSON.parse(localStorage.getItem('loggedUserIndex'));
    const usersDetList = JSON.parse(localStorage.getItem('usersDetailList'));
    this.userId = usersDetList[userIndex].id;
    this.user = this.userService.users[userIndex];
    console.log("usersDetList[userIndex].id");
    console.log(usersDetList[userIndex].id);
    console.log(this.user);


    this.route.params.subscribe(
      (params: Params) => {
        this.index = +params['id'];
        if (this.router.url.includes('shop')) {
          this.itemService.getItemsBySellerId(this.userId);
          console.log('sellerItemIndex');
          console.log(this.itemService.sellerItemsIndex);
          // this.role = this.user.role;
        }
        this.item = this.itemService.getItem(this.index);
      }
    );

    this.itemService.itemChanged.subscribe(
      (items: Item[]) => {
        // console.log("In logUserSubscribe this.router.url.charAt(this.router.url.length-1)");        
        // const params: Params = this.route.snapshot.params;
        this.index = +(this.route.snapshot.params['id']);
        this.item = this.itemService.getItem(this.index);
        this.role = this.user.role;

      }
    );

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
    this.itemService.updateCart(index);
    this.router.navigate(['items']);
  }

}
