
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

  constructor(
                private itemService: ItemsService,
                private userService: UserService,
                private router: Router,
                private route: ActivatedRoute ) { }



  ngOnInit() {
    console.log("ItemList Called================>");
    this.userService.loggedUserChanged.subscribe(
      (user: User) => {
        this.initProcess();
      });

    this.subscription = this.itemService.itemChanged.subscribe(
      (Items: Item[]) => {
        this.initProcess();
      });
  }

  initProcess() {
    if (!!this.userService.loggedUser && !!this.itemService.items) {
      this.role = this.userService.loggedUser.role;
      if (this.router.url.includes('shop')) {
        this.items = this.itemService.getItemsBySellerId(this.userService.loggedUser.id);
        console.log('this.itemService.sellerItemsIndex');
        console.log(this.itemService.sellerItemsIndex);
        console.log(this.itemService.items[this.itemService.sellerItemsIndex[0]]);
        console.log(this.itemService.items[this.itemService.sellerItemsIndex[1]]);
      } else {
        this.items = this.itemService.getItems();
      }
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
