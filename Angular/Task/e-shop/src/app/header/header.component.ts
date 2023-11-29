import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../users/user.service';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuthenticated = false;
  question = '';
  private userSub: Subscription;
  constructor(private userService: UserService, private authService: AuthService, private router: Router) { }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  ngOnInit() {
    this.userSub = this.userService.loggedUserChanged.subscribe(
      (loggedUser: User) => {
        this.isAuthenticated = !!loggedUser;
        if (!!loggedUser) {
          this.question = loggedUser.question;
        }
      }
    )
  }

  onLogout(){
    this.authService.logout();
  }

  onProfile(){
    // this.router.navigate(['profile'], { relativeTo: this.route });
    this.router.navigate(['/user/profile']);
  }
}
