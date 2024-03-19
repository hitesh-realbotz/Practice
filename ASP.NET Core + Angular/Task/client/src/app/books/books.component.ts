import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  isAuthenticated: boolean = false;

  constructor(private accountService: AccountService){ }

  ngOnInit(): void {
    this.accountService.currentUser$.subscribe({
      next: user => {
        !!user ? this.isAuthenticated = true : this.isAuthenticated = false;
      }
    })
  }

}
