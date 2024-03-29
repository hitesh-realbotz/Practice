import { Component, OnInit } from '@angular/core';
import { AccountService } from './_services/account.service';
import { User } from './_models/user';
import { CartService } from './_services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'BookStore';
  users: any;
  constructor(private accountService: AccountService, private cartService: CartService) { }

  //AutoLogin on page refresh
  ngOnInit(): void {
    this.accountService.autoLogin();
  }

}
