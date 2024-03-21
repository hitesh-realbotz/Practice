import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { AccountService } from '../_services/account.service';
import { SubscriptionsService } from '../_services/subscriptions.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  isAuthenticated: boolean = false;
  
  constructor(private accountService: AccountService, private subService: SubscriptionsService, ){ }

  ngOnInit(): void {


    this.subService.getLoggedUserChanges().subscribe({
      next: user => {
        !!user ? this.isAuthenticated = true : this.isAuthenticated = false;
       
      }
    })
    
  }

}
