import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Item } from '../item.model';
import { ItemsService } from '../items.service';
import { UserService } from 'src/app/users/user.service';
import { User } from 'src/app/auth/user.model';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements OnInit, OnDestroy {

  items: Item[];
  subscription: Subscription;
  role: string;
  userId: string;

  constructor(private itemService: ItemsService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute) { }
  ngOnInit() {

    // this.userService.usersChanged.subscribe(
    //   (users: User[]) => {
    //     console.log("loggedUserSubscribe called");
    //     this.role = this.userService.loggedUser.role;

    //   }
    // );

    if (this.router.url.includes('shop')) {

      const userIndex = JSON.parse(localStorage.getItem('loggedUserIndex'));
      const usersDetList = JSON.parse(localStorage.getItem('usersDetailList'));
      this.userId = usersDetList[userIndex].id;
      console.log("usersDetList[userIndex].id");
      console.log(usersDetList[userIndex].id);
     

      // this.items = this.itemService.getItemsBySellerId(this.userId);
      this.items = this.itemService.getItemsBySellerId(this.userId);
      this.userService.usersChanged.subscribe(
        (users: User[]) => {
          console.log("loggedUserSubscribe called from sub");
          console.log(this.userService.loggedUser);
          this.userId = this.userService.loggedUser.id;
          console.log('id from subscribe');
          console.log(this.userId);
          this.role = this.userService.loggedUser.role;

        }
      );
      this.subscription = this.itemService.itemChanged.subscribe(
        (Items: Item[]) => {
          this.items = this.itemService.getItemsBySellerId(this.userId);
        }
      )
      
      console.log(this.items);

    } else {
      this.userService.usersChanged.subscribe(
        (users: User[]) => {
          console.log("loggedUserSubscribe called");
          this.userId = this.userService.loggedUser.id;
          console.log('id from subscribe');
          console.log(this.userId);
          this.role = this.userService.loggedUser.role;
        }
      );
      this.subscription = this.itemService.itemChanged.subscribe(
        (Items: Item[]) => {
          this.items = Items;
        }
      )
      this.items = this.itemService.getItems();
    }

  }

  onNewItem() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
  ngOnDestroy() {

    if (!!this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
