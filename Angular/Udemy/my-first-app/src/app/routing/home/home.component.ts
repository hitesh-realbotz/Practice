import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loggedIn = false;

  constructor(private router: Router, private authService: AuthService){ }
  ngOnInit(): void {
    this.loggedIn = this.authService.loggedIn;
  }

  // onLoadServers(){
  //   this.router.navigate(['/servers'])
  // }
  onLoadServers(id: number){
    this.router.navigate(['/servers', id, 'edit'],{queryParams:{allowEdit:'1'}, fragment: 'loading'})
  }

  onLogin(){
    this.authService.login();
  }
  onLogout(){
    this.authService.logout();
  }

}
