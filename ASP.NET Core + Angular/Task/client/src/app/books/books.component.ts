import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { AccountService } from '../_services/account.service';
import { SubscriptionsService } from '../_services/subscriptions.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  componentSubscriptions = new Subscription();

  constructor(private subService: SubscriptionsService) { }

  ngOnInit(): void {

    this.componentSubscriptions.add(
      this.subService.getLoggedUserChanges().subscribe({
        next: user => {
          !!user ? this.isAuthenticated = true : this.isAuthenticated = false;
        }
      }));
  }


  //Unsubscribe to subscriptions
  ngOnDestroy(): void {
    this.componentSubscriptions.unsubscribe();
  }

}
