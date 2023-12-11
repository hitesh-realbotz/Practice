
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

  constructor(private itemService: ItemsService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,

  ) { }

  ngOnInit() {
    console.log("ItemList Called================>");
    if (this.router.url.includes('shop')) {

      this.userService.loggedUserChanged.subscribe(
        (user: User) => {
          if (!!this.userService.loggedUser) {
            console.log("ItemsListComponent shop loggedUserChanged.subscribe called");

            console.log('this.userService.loggedUser', this.userService.loggedUser);
            console.log('this.userService.loggedUser.role', this.userService.loggedUser.role);
            console.log('users.role', user.role);
            this.role = user.role;
            console.log('this.role', this.role);

            if (!!this.items) {
              this.items = this.itemService.getItemsBySellerId(this.userService.loggedUser.id);
            } 
          }
        });

      this.subscription = this.itemService.itemChanged.subscribe(
        (items: Item[]) => {
          if(!!this.role){
            this.items = this.itemService.getItemsBySellerId(this.userService.loggedUser.id);
          }else{
            this.items = items;
          }
        });

      if (!!this.userService.loggedUser) {
        // this.itemSub('from outer Sub');
        this.items = this.itemService.getItemsBySellerId(this.userService.loggedUser.id);
        console.log(this.items);
      }
    } else {
      this.userService.loggedUserChanged.subscribe(
        (user: User) => {
          if (!!this.userService.loggedUser) {
            console.log("ItemsListComponent loggedUserChanged.subscribe called");
            console.log('this.userService.loggedUser', this.userService.loggedUser);
            console.log('this.userService.loggedUser.role', this.userService.loggedUser.role);
            console.log('users.role', user.role);
            this.role = user.role;
            console.log('this.role', this.role);
          }
        });

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
