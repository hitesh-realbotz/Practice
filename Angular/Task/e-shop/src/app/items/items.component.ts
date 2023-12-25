import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from './item.model';
import { Subject, Subscription } from 'rxjs';
import { ItemsService } from './items.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../users/user.service';
import { User } from '../auth/user.model';
import { SubscriptionService } from '../shared/subscriptions.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit, OnDestroy {

  // selectedItem: Item;
  selectedItem: Item[];
  isAuthenticated: boolean;
  componentSubscriptions = new Subscription();

  constructor(private itemService: ItemsService, private router: Router, private route: ActivatedRoute, private userService: UserService, private subService: SubscriptionService) { }

  ngOnInit() {
    console.log('Items Init called');
    this.isAuthenticated = !!this.userService.loggedUser;

    //Subscribe to LoggedUserChanges
    this.componentSubscriptions.add(
      this.subService.getLoggedUserChanges().subscribe(
        (user: User) => {
          console.log('loggedChanged in Item', user, !!user);
          !!user ? this.isAuthenticated = true : this.isAuthenticated = false;
          this.initProcess();
        })
    );

    //Subscribe to ItemsChanges
    this.componentSubscriptions.add(
      this.subService.getItemChanges().subscribe(
        (items: Item[]) => {
          // !!items ? this.selectedItem = items : this.router.navigate(['/auth']);
          this.initProcess();
        })
    );
  }

  initProcess() {
    if (!!this.userService.loggedUser && !!this.itemService.items) {
      this.selectedItem = this.itemService.items;
      this.isAuthenticated = true;
    } else if (!!this.userService.loggedUser && !this.itemService.items) {
      this.isAuthenticated = true;
    } else if (!this.userService.loggedUserIndex && !this.itemService.items) {
      this.router.navigate(['/auth']);
    }
  }

  //Navigates to BlankForm for New Item addition
  onNewItem() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  //Unsubscribe to all subscriptions
  ngOnDestroy() {
    this.componentSubscriptions.unsubscribe();
  }
}

