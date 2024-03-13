import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  user: User = {} as User;
  isAuthenticated = false;

  constructor(private accountService: AccountService) { }
  ngOnInit(): void {
    this.accountService.currentUser$.subscribe({
      next: data => {

        this.user = !!data ? data : {} as User;
        this.isAuthenticated = !!data ;
      }
    });
  }


  onLogout() {
    this.accountService.logout();
  }
}
