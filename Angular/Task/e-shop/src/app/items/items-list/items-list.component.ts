import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Item } from '../item.model';
import { ItemsService } from '../items.service';
import { UserService } from 'src/app/users/user.service';

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
    private route: ActivatedRoute) {

  }
  ngOnInit() {
    this.role = this.userService.loggedUser.role;

    if(this.router.url === '/shop'){
      const id = this.userService.loggedUser.id;
      this.items = this.itemService.getItemsBySellerId(id);
    }else{
      this.subscription = this.itemService.itemChanged.subscribe(
          (Items: Item[]) => {
            this.items = Items;
          }
        )
      this.items = this.itemService.getItems();
    }
    // this.subscription = this.itemService.itemChanged.subscribe(
    //   (Items: Item[]) => {
    //     this.items = Items;
    //   }
    // )
    // this.items = this.itemService.getItems();

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
