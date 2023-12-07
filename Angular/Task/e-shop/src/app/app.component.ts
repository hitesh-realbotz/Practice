import { Component, OnInit } from '@angular/core';
import { DataStorageService } from './shared/data-storage.service';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private dataStorageService: DataStorageService, private authService: AuthService) { }

  ngOnInit() {
    // this.authService.autoLogin();
    this.dataStorageService.fetchUsers();
    
  }
  title = 'e-shop';
}
