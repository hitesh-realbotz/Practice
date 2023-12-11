import { Component, OnInit } from '@angular/core';
import { DataStorageService } from './shared/data-storage.service';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private dataStorageService: DataStorageService, private authService: AuthService, private router: Router) {  }

  ngOnInit() {
    this.dataStorageService.fetchUsers();
    // this.dataStorageService.fetchItems();
    this.authService.autoLogin();
  }
  title = 'e-shop';
}
